import { Response, NextFunction } from 'express'

import { IHttpError } from '../../../utils/erros/http/IHttpError'
import logger from '../../../utils/logger/index'
import errorLogMessage from '../../../utils/logger/messages/error-log-message'

export default (error: IHttpError, request: any, response: Response, next: NextFunction) => {
  
  const internalError = 500

  logger.error(
    errorLogMessage(request.method, request.originalUrl, error.status || internalError, error.message, request.start, request.headers.host)
  )

  response.status(error.status || internalError)
  response.send({
    Error: error.name,
    Message: error.message
  })

}