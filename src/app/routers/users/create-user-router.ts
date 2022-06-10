import { Request, Response, NextFunction } from 'express'

import { IRequestBodyValidator }from '../../../utils/validators/interfaces'
import IHttpResponse from '../../../utils/http/response/interfaces/IHttpResponse'
import CreateUser from '../../cases/users/create-user'

class CreateUserRouter {

  constructor (
    private createUser: CreateUser,
    private requestBodyValidator: IRequestBodyValidator,
    private httpResponse: IHttpResponse
  ) {}

  sign = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const requiredParams = ['name', 'lastName', 'phoneNumber', 'email', 'password', 'repeatPassword']
      const body = req.body
    
      this.requestBodyValidator.validate(requiredParams, body)
  
      const user = await this.createUser.create(body.name, body.lastName, body.phoneNumber, body.email, body.password, body.repeatPassword)
      
      const response = this.httpResponse.success( { message: 'Account created', data: {user: user.retrievableData()} } )

      res.send(response)

    } catch (error) {
      next(error)
    }
  }
}

export default CreateUserRouter
