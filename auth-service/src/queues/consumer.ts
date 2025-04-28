import { getChannel } from '../messaging/rabbitmq';
import * as dal from '../repository/users.dal';

export const consumeUserDelete = async (queue: string) => {
  const channel = getChannel();
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());

    console.log("[User Delete Consumer] Received:", data);

    const { userId } = data;

    await dal.deleteUser({ id: userId });

    channel.ack(msg);
  });
};
