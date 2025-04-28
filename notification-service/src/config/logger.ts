import winston from 'winston';

const { combine, timestamp, errors, printf, colorize } = winston.format;

const logFormat = printf(
  ({ timestamp, level, message, code, name, details, stack }) => {
    const formattedName = name ? `[${name}]` : "";
    const formattedCode = code ? `(code: ${code})` : "";
    const formattedDetails = details ? `- ${details}` : "";
    const formattedStack = stack ? stack : "";

    return `${timestamp} ${level}: ${formattedName} ${message} ${formattedCode} ${formattedDetails}${formattedStack} `;
  }
);

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    colorize({ all: true }),
    logFormat
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
