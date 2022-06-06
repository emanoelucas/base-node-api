import { Request, Response, NextFunction } from 'express'

import requestValidator from '../../../utils/validators/request-body-validator'
import HttpResponse from '../../../utils/http/response/http-response'
import renewProfile from '../../services/users/renew-profile'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requiredParams = ['name', 'lastName', 'phoneNumber', 'email']
    const body = req.body
    requestValidator(requiredParams, body)

    const id = req.user.sub

    const user = await renewProfile.renew(id, body.name, body.lastName, body.phoneNumber, body.email)

    res.send(
      HttpResponse.success( { message: 'Data updated', data: {user: user.retrievableData()} } )
    )

  } catch (error) {
    next(error)
  }
}