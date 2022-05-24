import { Request, Response, NextFunction } from 'express'

import { IHttpError } from './../../../utils/http/erros/IHttpError'
import { IHttpResponse } from './../../../utils/http/response/IHttpResponse'

export default (error: IHttpError, req: Request, res: Response, next: NextFunction) => {
  
  const internalError = 500
  res.status(error.status || internalError)
  const response: IHttpResponse = {
    message: error.message,
    success: false,
    data: {}
  }
  res.send(response)
  error.stack ? console.log('\n', 'stack:', error.stack) : console.log('\n')
}
