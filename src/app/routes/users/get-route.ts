import { Request, Response, NextFunction } from 'express'

import requestValidator from '../../../utils/validators/request-body-validator'
import retrieve from '../../cases/users/retrieve'
import HttpResponse from './../../../utils/http/response'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requiredParams = ['id']
    const params = req.params
  
    requestValidator(requiredParams, params)

    const user = await retrieve.run(params.id)

    res.send(
      HttpResponse.sucess( { message: 'User retrieved', data: {user} } )
    )

  } catch (error) {
    next(error)
  }
}