import { Request, Response, NextFunction } from 'express'

import { NotFoundError } from '../../../utils/erros/http'

export default ( request: Request, response: Response, next: NextFunction) => {
  next(new NotFoundError(`route "${request.originalUrl}" was not found`))
}