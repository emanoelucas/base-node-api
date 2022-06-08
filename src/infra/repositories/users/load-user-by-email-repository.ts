import User from '../../database/models/user'
import MissingParamError from '../../../utils/erros/missing-param-error'

class LoadUserByEmail {
  async load (email: string) {
    
    if (!email) 
      throw new MissingParamError(`email`)

    return await User.findOne({
      where: { email: email }
    })
  }
}

export default new LoadUserByEmail()