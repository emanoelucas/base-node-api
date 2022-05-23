import { Request, Response, NextFunction } from 'express'

import { IHttpError } from '../../../utils/erros/http/IHttpError'

export default (error: IHttpError, req: Request, res: Response, next: NextFunction) => {
  
  const internalError = 500

  res.status(error.status || internalError)
  res.send({
    error: error.name,
    message: error.message
  })
  error.stack ? console.log('\n', 'stack:', error.stack) : console.log('\n')
}
