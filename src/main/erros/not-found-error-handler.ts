import { Request, Response, NextFunction } from 'express'

import { NotFoundError } from '../../utils/erros/http'

export default ( request: Request, response: Response, next: NextFunction) => {
  next(new NotFoundError(`A rota '${request.originalUrl}' não foi encontrada`))
}