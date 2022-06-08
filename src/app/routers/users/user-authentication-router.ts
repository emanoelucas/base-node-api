import { Request, Response, NextFunction } from 'express'

import Authentication from '../../cases/users/user-authentication'
import HttpResponse from '../../../utils/http/response/http-response'
import { IRequestBodyValidator } from '../../../utils/validators/interfaces'

class UserAuthenticationRouter {
  
  constructor (
    private authentication: Authentication,
    private requestBodyValidator: IRequestBodyValidator
  ) {}
  
  sign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requiredParams = ['email', 'password']
      const body = req.body
    
      this.requestBodyValidator.validate(requiredParams, body)
  
      const {user, accessToken, refreshToken} = await this.authentication.auth(body.email, body.password)
      
      res.send(
        HttpResponse.success( { message: 'You are logged in', data: {user: user.retrievableData(), tokens: {accessToken, refreshToken}} } )
      )
  
    } catch (error) {
      next(error)
    }
  }
}

export default UserAuthenticationRouter