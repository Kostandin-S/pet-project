import { getChannel } from '../messaging/rabbitmq';
import { UserDeleteMessage } from '../users.types';

export const publishUserDeleted = async (
  queue: string,
  message: UserDeleteMessage
) => {
  const channel = getChannel();
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
};
