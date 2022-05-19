import { Request, Response, NextFunction } from 'express'
import infoLogMessage from './messages/info-log-message'
import logger from '.'

export default (request: Request, response: Response, next: NextFunction) => {
  console.log(request.headers.host)
  logger.info(
    infoLogMessage(request.method, request.originalUrl, request.ip, request.headers.host)
  )
  next()
}