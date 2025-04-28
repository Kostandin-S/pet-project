import {
  BookDeleteMessage,
  BookUpdatedMessage,
} from '../books.types';
import { getChannel } from '../messaging/rabbitmq';

const publishMessage = async (queue: string, message: object) => {
  const channel = getChannel();
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
};

export const publishBookUpdate = async (
  queue: string,
  message: BookUpdatedMessage
) => {
  await publishMessage(queue, message);
};

export const publishBookDelete = async (
  queue: string,
  message: BookDeleteMessage
) => {
  await publishMessage(queue, message);
};
