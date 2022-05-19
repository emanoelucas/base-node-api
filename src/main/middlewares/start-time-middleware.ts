import { Response, NextFunction } from 'express'

export default (request: any, response: Response, next: NextFunction) => {
  request.start = Date.now()
  next()
}