import { Request, Response, NextFunction } from 'express'

import requestValidator from '../../../utils/validators/request-body-validator'
import tokenRefresh from '../../cases/users/token-refresh'
import HttpResponse from './../../../utils/http/response'
import tokenGeneration from '../../cases/users/token-generation'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requiredParams = ['id', 'refreshToken']
    const body = req.body
  
    requestValidator(requiredParams, body)

    const user = await tokenRefresh.run(body.id, body.refreshToken)
    const accessToken = tokenGeneration.refreshToken({ sub: user.id }) 

    res.send(
      HttpResponse.sucess( { message: 'Token refreshed', data: {accessToken} } )
    )

  } catch (error) {
    next(error)
  }
}