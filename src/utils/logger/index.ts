import { createLogger, format, transports } from 'winston'

const { combine, timestamp, printf } = format

const levels = {
  fatal: 0,
  error: 1,
  info: 2
}

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${level.toLocaleUpperCase()}]: ${message}, ${timestamp}.`
});

const logger = createLogger({
  levels: levels,
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()]
})

export default logger