import { Request, Response, NextFunction } from 'express'

import { requestBodyValidator }from '../../../utils/validators'
import creation from '../../cases/users/creation'
import HttpResponse from '../../../utils/http/response/http-response'

class SignUpRouter {

  sign = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const requiredParams = ['name', 'lastName', 'phoneNumber', 'email', 'password', 'repeatPassword']
      const body = req.body
    
      requestBodyValidator.validate(requiredParams, body)
  
      const user = await creation.create(body.name, body.lastName, body.phoneNumber, body.email, body.password, body.repeatPassword)
  
      res.send(
        HttpResponse.success( { message: 'Account created', data: {user: user.retrievableData()} } )
      )
  
    } catch (error) {
      next(error)
    }
  }
}

export default new SignUpRouter()
