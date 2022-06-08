import { Request, Response, NextFunction } from 'express'

import { IRequestBodyValidator } from '../../../utils/validators/interfaces'
import UserTokenRefresh from '../../cases/users/user-token-refresh'
import { ITokenGenerator } from '../../../utils/libraries/interfaces'
import HttpResponse from '../../../utils/http/response/http-response'

class UserTokenRefreshRouter {

  constructor (
    private userTokenRefresh: UserTokenRefresh,
    private requestBodyValidator: IRequestBodyValidator
  ) { }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const requiredParams = ['id', 'refreshToken']
      const body = req.body
    
      this.requestBodyValidator.validate(requiredParams, body)
  
      const { user, accessToken } = await this.userTokenRefresh.get(body.id, body.refreshToken)
  
      res.send(
        HttpResponse.success( { message: 'Token refreshed', data: {accessToken} } )
      )
  
    } catch (error) {
      next(error)
    }
  }
}

export default UserTokenRefreshRouter
