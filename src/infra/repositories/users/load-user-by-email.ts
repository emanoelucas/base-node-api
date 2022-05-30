import User from '../../database/models/user'
import MissingParamError from '../../../utils/erros/missing-param-error'

class LoadUserByEmail {
  async load (email: string, options?: any) {
    
    if (!email) 
      throw new MissingParamError(`email`)
    
    const defaultRule = {
      where: { email: email }
    }
    
    if (options) {
      Object.assign(defaultRule, options)
    }

    return await User.findOne(defaultRule)
  }
}

export default new LoadUserByEmail()