import { getChannel } from "../messaging/rabbitmq";
import { BookRecommendationsMessage } from "../user-books.types";

export const publishBookRecommendations = async (
  queue: string,
  message: BookRecommendationsMessage
) => {
  const channel = getChannel();
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
};
