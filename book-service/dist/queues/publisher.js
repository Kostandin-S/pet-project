"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishBookUpdate = void 0;
const rabbitmq_1 = require("../messaging/rabbitmq");
const publishBookUpdate = async (queue, message) => {
    const channel = (0, rabbitmq_1.getChannel)();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
        persistent: true,
    });
};
exports.publishBookUpdate = publishBookUpdate;
