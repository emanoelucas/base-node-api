import { Request, Response, NextFunction } from 'express'

import { requestBodyValidator } from '../../../utils/validators'
import tokenRefresh from '../../cases/users/token-refresh'
import HttpResponse from '../../../utils/http/response/http-response'
import tokenGeneration from '../../../utils/libraries/token-generation'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requiredParams = ['id', 'refreshToken']
    const body = req.body
  
    requestBodyValidator.validate(requiredParams, body)

    const user = await tokenRefresh.run(body.id, body.refreshToken)
    const accessToken = tokenGeneration.refreshToken({ sub: user.id }) 

    res.send(
      HttpResponse.success( { message: 'Token refreshed', data: {accessToken} } )
    )

  } catch (error) {
    next(error)
  }
}