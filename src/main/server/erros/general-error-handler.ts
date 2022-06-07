import { Request, Response, NextFunction } from 'express'

import { IHttpError } from './../../../utils/http/erros/IHttpError'
import HttpResponse from '../../../utils/http/response/http-response'

export default (error: IHttpError, req: Request, res: Response, next: NextFunction) => {
  
  if (error.name === 'SequelizeValidationError') {
    const sequelizeError = error.errors?.shift()
    error = sequelizeError.original ? sequelizeError.original : error
  }

  const internalError = 500
  res.status(error.status || internalError)
  
  const response = {
    message: error.message,
  }

  res.send( HttpResponse.fail(response) )
  
  error.stack ? console.log('\n', 'stack:', error.stack) : console.log('\n')
}
