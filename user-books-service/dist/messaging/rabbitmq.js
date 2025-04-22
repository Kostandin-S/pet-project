"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannel = exports.connectRabbitMQ = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
let channel;
const connectRabbitMQ = async (url) => {
    const connection = await amqplib_1.default.connect(url);
    channel = await connection.createChannel();
    return channel;
};
exports.connectRabbitMQ = connectRabbitMQ;
const getChannel = () => channel;
exports.getChannel = getChannel;
