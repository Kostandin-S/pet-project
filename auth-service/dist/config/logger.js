"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, errors, printf, colorize } = winston_1.default.format;
const logFormat = printf(({ timestamp, level, message, code, name, details, stack }) => {
    const formattedName = name ? `[${name}]` : "";
    const formattedCode = code ? `(code: ${code})` : "";
    const formattedDetails = details ? `- ${details}` : "";
    const formattedStack = stack ? stack : "";
    return `${timestamp} ${level}: ${formattedName} ${message} ${formattedCode} ${formattedDetails}${formattedStack}`;
});
const logger = winston_1.default.createLogger({
    level: "info",
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), colorize({ all: true }), logFormat),
    transports: [new winston_1.default.transports.Console()],
});
exports.default = logger;
