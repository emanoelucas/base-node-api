import User from '../../database/models/user'
import MissingParamError from '../../../utils/erros/missing-param-error'

class LoadUserById {
  async load (id: string) {
    
    if (!id) 
      throw new MissingParamError(`id`)

    return await User.findOne({
      where: { id: id }
    })

  }
}

export default new LoadUserById()