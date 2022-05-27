import User from '../../database/models/user'
import MissingParamError from '../../../utils/erros/missing-param-error'

class UpdateUser {
  async update (user: User, name: string, lastName:string, phoneNumber: string, email: string) {
    if(!user) 
      throw new MissingParamError(`user`)
    if(!name) 
      throw new MissingParamError(`name`)
    if(!lastName) 
      throw new MissingParamError(`lastName`)
    if(!phoneNumber) 
      throw new MissingParamError(`phoneNumber`)
    if(!email) 
      throw new MissingParamError(`email`)

    return await user.update({
      name,
      lastName,
      phoneNumber,
      email
    })

    //return user.reload()
    
  }
}

export default new UpdateUser()
