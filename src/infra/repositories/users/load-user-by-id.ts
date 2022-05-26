import User from '../../database/models/user'
import MissingParamError from '../../../utils/erros/missing-param-error'

class LoadUserById {
  async load (id: string, options?: any) {
    
    if (!id) 
      throw new MissingParamError(`id`)
    
    const defaultRule = {
      where: { id: id }
    }
    
    if (options) {
      Object.assign(defaultRule, options)
    }

    const user = await User.findOne(defaultRule)

    return user
  }
}

export default new LoadUserById()