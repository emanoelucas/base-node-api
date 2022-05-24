import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  req.headers[`${process.env.HEADER_TIME_RESPONSE}`] = Date.now().toString()
  next()
}