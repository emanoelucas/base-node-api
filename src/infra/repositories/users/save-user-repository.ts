import User from '../../database/models/user'
import MissingParamError from '../../../utils/erros/missing-param-error'

class SaveUser {
  async save (name: string, lastName:string, phoneNumber: string, email: string, password: string) {
    if(!name) 
      throw new MissingParamError(`name`)
    if(!lastName) 
      throw new MissingParamError(`lastName`)
    if(!phoneNumber) 
      throw new MissingParamError(`phoneNumber`)
    if(!email) 
      throw new MissingParamError(`email`)
    if(!password) 
      throw new MissingParamError(`password`)

    return await User.create({
      name,
      email,
      lastName,
      phoneNumber,
      password
    })

  }
}

export default new SaveUser()
