import { Request, Response, NextFunction } from 'express'

import Authentication from '../../cases/users/user-authentication'
import { IRequestBodyValidator } from '../../../utils/validators/interfaces'
import IHttpResponse from '../../../utils/http/response/interfaces/IHttpResponse'

class UserAuthenticationRouter {
  
  constructor (
    private authentication: Authentication,
    private requestBodyValidator: IRequestBodyValidator,
    private httpResponse: IHttpResponse
  ) {}
  
  sign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requiredParams = ['email', 'password']
      const body = req.body
    
      this.requestBodyValidator.validate(requiredParams, body)
  
      const {user, accessToken, refreshToken} = await this.authentication.auth(body.email, body.password)
     
      const response = this.httpResponse.success( 
        { 
          message: 'You are logged in', 
          data: {
            user: user.retrievableData(), 
            tokens: {accessToken, refreshToken}
          } 
        } 
      )
      res.send(response)
  
    } catch (error) {
      next(error)
    }
  }
}

export default UserAuthenticationRouter