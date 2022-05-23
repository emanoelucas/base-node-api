import { Request, Response, NextFunction } from 'express'

import { NotFoundError } from '../../../utils/erros/http'

export default ( req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`route "${req.originalUrl}" was not found`))
}