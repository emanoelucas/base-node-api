import { Request, Response, NextFunction } from 'express'
import UpdateUser from '../../cases/users/update-user'
import { IRequestBodyValidator } from '../../../utils/validators/interfaces'
import IHttpResponse from '../../../utils/http/response/interfaces/IHttpResponse'

class UpdateUserRouter {

  constructor (
    private updateUser: UpdateUser,
    private requestBodyValidator: IRequestBodyValidator,
    private httpResponse: IHttpResponse
  ) { }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const requiredParams = ['name', 'lastName', 'phoneNumber', 'email']
      const body = req.body
      this.requestBodyValidator.validate(requiredParams, body)
  
      const id = req.user.sub
  
      const user = await this.updateUser.update(id, body.name, body.lastName, body.phoneNumber, body.email)
      const response = this.httpResponse.success( { message: 'Data updated', data: {user: user.retrievableData()} } )
      
      res.send(response)
  
    } catch (error) {
      next(error)
    }
  }
}

export default UpdateUserRouter
