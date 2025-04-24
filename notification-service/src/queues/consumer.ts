import { getChannel } from "../messaging/rabbitmq";

export const consumeBookRecommendations = async (queue: string) => {
  const channel = getChannel();
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());

    console.log("[Book Recommendations Consumer] Received:", data);

    // TODO: Add logic here

    channel.ack(msg);
  });
};
