import { Request, Response, NextFunction } from 'express'

import requestValidator from '../../../utils/validators/request-body-validator'
import authentication from '../../cases/users/authentication'
import HttpResponse from './../../../utils/http/response'
import tokenGeneration from '../../cases/users/token-generation'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requiredParams = ['email', 'password']
    const body = req.body
  
    requestValidator(requiredParams, body)

    const user = await authentication.auth(body.email, body.password)
    const accessToken = await tokenGeneration.generate({ sub: user.id }) 
    
    res.send(
      HttpResponse.sucess( { message: 'You are logged in', data: {user, accessToken} } )
    )

  } catch (error) {
    next(error)
  }
}