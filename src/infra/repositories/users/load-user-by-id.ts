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

    return await User.findOne(defaultRule)

  }
}

export default new LoadUserById()