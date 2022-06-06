import { Request, Response, NextFunction } from 'express'

import retrieve from '../../services/users/retrieve'
import HttpResponse from '../../../utils/http/response'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.user.sub
    const user = await retrieve.run(id)

    res.send(
      HttpResponse.sucess( { message: 'User retrieved', data: {user: user.retrievableData()} } )
    )

  } catch (error) {
    next(error)
  }
}