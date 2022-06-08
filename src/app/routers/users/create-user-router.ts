import { Request, Response, NextFunction } from 'express'

import { IRequestBodyValidator }from '../../../utils/validators/interfaces'
import CreateUser from '../../cases/users/create-user'
import HttpResponse from '../../../utils/http/response/http-response'

class CreateUserRouter {

  constructor (
    private createUser: CreateUser,
    private requestBodyValidator: IRequestBodyValidator
  ) {}

  sign = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const requiredParams = ['name', 'lastName', 'phoneNumber', 'email', 'password', 'repeatPassword']
      const body = req.body
    
      this.requestBodyValidator.validate(requiredParams, body)
  
      const user = await this.createUser.create(body.name, body.lastName, body.phoneNumber, body.email, body.password, body.repeatPassword)
  
      res.send(
        HttpResponse.success( { message: 'Account created', data: {user: user.retrievableData()} } )
      )
  
    } catch (error) {
      next(error)
    }
  }
}

export default CreateUserRouter
