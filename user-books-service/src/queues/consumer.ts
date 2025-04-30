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

export const consumeBookDelete = async (queue: string) => {
  const channel = getChannel();
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());

    console.log("[Book Delete Consumer] Received:", data);

    const { bookId } = data;

    await dal.deleteManyUserBooks({ bookId });

    channel.ack(msg);
  });
};

export const consumeUserDelete = async (queue: string) => {
  const channel = getChannel();
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());

    console.log("[User Delete Consumer] Received:", data);

    const { userId } = data;

    await dal.deleteManyUserBooks({ userId });

    channel.ack(msg);
  });
};
