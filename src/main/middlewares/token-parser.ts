import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { UnauthorizedError } from '../../utils/http/erros'

export default (req: Request, res: Response, next: NextFunction) => {
  
  const tokenHeader = process.env.HEADER_AUTHORIZATION_TOKEN as string
  const token = req.header(tokenHeader) as string

  if (!token)
    next(new UnauthorizedError(`No token provided on header ${tokenHeader}`))
  
  const secretKey = process.env.JWT_SECRET as string

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err)
      next(new UnauthorizedError(err.message))
    req.user = decoded
  })

  next()
}
