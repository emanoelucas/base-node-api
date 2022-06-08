import { Request, Response, NextFunction } from 'express'

import { requestBodyValidator } from '../../../utils/validators'
import authentication from '../../cases/users/authentication'
import HttpResponse from '../../../utils/http/response/http-response'
import tokenGeneration from '../../cases/users/token-generation'
import { setUserParameter } from '../../../infra/repositories/users'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requiredParams = ['email', 'password']
    const body = req.body
  
    requestBodyValidator.validate(requiredParams, body)

    const user = await authentication.auth(body.email, body.password)
    const accessToken = tokenGeneration.token({ sub: user.id }) 
    const refreshToken = tokenGeneration.refreshToken({ sub: user.id })
    await setUserParameter.set(user, 'refreshToken', refreshToken)

    res.send(
      HttpResponse.success( { message: 'You are logged in', data: {user: user.retrievableData(), tokens: {accessToken, refreshToken}} } )
    )

  } catch (error) {
    next(error)
  }
}