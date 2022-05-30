import { Request, Response, NextFunction } from 'express'

import requestValidator from '../../../utils/validators/request-body-validator'
import creation from '../../cases/users/creation'
import HttpResponse from './../../../utils/http/response'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requiredParams = ['name', 'lastName', 'phoneNumber', 'email', 'password', 'repeatPassword']
    const body = req.body
  
    requestValidator(requiredParams, body)

    const user = await creation.create(body.name, body.lastName, body.phoneNumber, body.email, body.password, body.repeatPassword)

    res.send(
      HttpResponse.sucess( { message: 'Account created', data: {user: user.retrievableData()} } )
    )

  } catch (error) {
    next(error)
  }
}