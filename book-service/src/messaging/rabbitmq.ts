import amqp from "amqplib";

let channel: amqp.Channel;

export const connectRabbitMQ = async (url: string) => {
  const connection = await amqp.connect(url);
  channel = await connection.createChannel();
  return channel;
};

export const getChannel = () => channel;
