import { Request, Response, NextFunction } from 'express'

import { requestBodyValidator } from '../../../utils/validators'
import HttpResponse from '../../../utils/http/response/http-response'
import renewProfile from '../../cases/users/renew-profile'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requiredParams = ['name', 'lastName', 'phoneNumber', 'email']
    const body = req.body
    requestBodyValidator.validate(requiredParams, body)

    const id = req.user.sub

    const user = await renewProfile.renew(id, body.name, body.lastName, body.phoneNumber, body.email)

    res.send(
      HttpResponse.success( { message: 'Data updated', data: {user: user.retrievableData()} } )
    )

  } catch (error) {
    next(error)
  }
}