import { getChannel } from '../messaging/rabbitmq';
import * as dal from '../repositories/user-books.dal';

export const consumeBookUpdates = async (queue: string) => {
  const channel = getChannel();
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());

    console.log("[Book Updated Consumer] Received:", data);

    const { bookId, title, author } = data;

    await dal.updateManyUserBooks(
      { bookId },
      { bookTitle: title, bookAuthor: author }
    );

    channel.ack(msg);
  });
};
