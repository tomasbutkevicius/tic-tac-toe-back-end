const { format, createLogger, transports } = require("winston");
const { timestamp, combine, printf } = format;

function buildDevLogger() {
    const logFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`;
    });


    return createLogger({
        level: process.env.LOGGER_LEVEL,
        format: combine(format.colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            logFormat,
            format.errors({ stack: true })),
        defaultMeta: { service: 'tic-tac-toe-service' },
        transports: [
            new transports.Console()
        ],
    });
}


module.exports = buildDevLogger;