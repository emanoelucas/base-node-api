import { Request, Response, NextFunction } from 'express'

import { IHttpError } from '../../utils/erros/http/IHttpError'

export default (error: IHttpError, request: Request, response: Response, next: NextFunction) => {
  
  console.error(error)

  response.status(error.status || 500)
  response.send({
    Error: error.name,
    Message: error.message
  })

}