import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  req.headers[`${process.env.TIME_HEADER}`] = Date.now().toString()
  next()
}