import User from '../../database/models/user'
import MissingParamError from '../../../utils/erros/missing-param-error'

class SetUserParameter {
  async set (user: User, paramName: string, paramValue: any) {
    if(!user) 
      throw new MissingParamError(`user`)
    if(!paramName) 
      throw new MissingParamError(`paramName`)
    if(!paramValue) 
      throw new MissingParamError(`paramValue`)
    
    const data: any = {}
    data[`${paramName}`] = paramValue
    
    await (await user.update(data)).reload()
  
  }
}

export default new SetUserParameter()
