import { Request, Response, NextFunction } from 'express'

import GetUser from '../../cases/users/get-user'
import HttpResponse from '../../../utils/http/response/http-response'

class GetUserRouter{

  constructor(
    private getUser: GetUser
  ){ }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const id = req.user.sub
      const user = await this.getUser.get(id)
  
      res.send(
        HttpResponse.success( { message: 'User retrieved', data: {user: user.retrievableData()} } )
      )
  
    } catch (error) {
      next(error)
    }
  }
}

export default GetUserRouter
