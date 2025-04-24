import { sendBookRecommendationsEmail } from "../helpers/mailer";
import { getChannel } from "../messaging/rabbitmq";
import { InternalServerError } from "../utils/errors";

export const consumeBookRecommendations = async (queue: string) => {
  const channel = getChannel();
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());

    console.log("[Book Recommendations Consumer] Received:", data);

    const { email, genres, books } = data;

    try {
      await sendBookRecommendationsEmail(email, genres, books);
    } catch (error) {
      throw new InternalServerError(error);
    }

    channel.ack(msg);
  });
};
