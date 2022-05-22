import { Response, NextFunction } from 'express'

import { IHttpError } from '../../../utils/erros/http/IHttpError'

export default (error: IHttpError, request: any, response: Response, next: NextFunction) => {
  
  const internalError = 500

  response.status(error.status || internalError)
  response.send({
    error: error.name,
    message: error.message
  })
  error.stack ? console.log('stack:', error.stack) : console.log('\n')
}
