import { Request, Response, NextFunction } from 'express'

import { IRequestBodyValidator } from '../../../utils/validators/interfaces'
import UserTokenRefresh from '../../cases/users/user-token-refresh'
import IHttpResponse from '../../../utils/http/response/interfaces/IHttpResponse'

class UserTokenRefreshRouter {

  constructor (
    private userTokenRefresh: UserTokenRefresh,
    private requestBodyValidator: IRequestBodyValidator,
    private httpResponse: IHttpResponse
  ) { }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const requiredParams = ['id', 'refreshToken']
      const body = req.body
    
      this.requestBodyValidator.validate(requiredParams, body)
  
      const accessToken = await this.userTokenRefresh.get(body.id, body.refreshToken)
  
      const response = this.httpResponse.success( { message: 'Token refreshed', data: {accessToken} } )
      res.send(response)
  
    } catch (error) {
      next(error)
    }
  }
}

export default UserTokenRefreshRouter
