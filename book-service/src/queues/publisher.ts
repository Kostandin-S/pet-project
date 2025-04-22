import { BookUpdatedMessage } from '../books.types';
import { getChannel } from '../messaging/rabbitmq';

export const publishBookUpdate = async (
  queue: string,
  message: BookUpdatedMessage
) => {
  const channel = getChannel();
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
};
