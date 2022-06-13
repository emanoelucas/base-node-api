import { Request, Response, NextFunction } from 'express'

import GetUser from '../../cases/users/get-user'
import IHttpResponse from '../../../utils/http/response/interfaces/IHttpResponse'
class GetUserRouter{

  constructor(
    private getUser: GetUser,
    private httpResponse: IHttpResponse
  ){ }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const id = req.user.sub
      const user = await this.getUser.get(id)
  
      const response = this.httpResponse.success( { message: 'User retrieved', data: {user: user.retrievableData()} } )
      res.send(response)
  
    } catch (error) {
      next(error)
    }
  }
}

export default GetUserRouter
