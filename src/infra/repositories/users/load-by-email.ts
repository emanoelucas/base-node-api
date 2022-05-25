import User from '../../database/models/user'

import { NotFoundError, BadRequestError } from '../../../utils/http/erros'

class LoadByEmail {
  async load (email: string) {
    
    if (!email) 
      throw new BadRequestError(`No email provided`)
    
    const user = await User.findOne({
      attributes: ['id', 'name', 'email'] ,
      where: { email: email }
    })

    if (!user)
      throw new NotFoundError(`Email address '${email}' not found on database`)

    return user
  }
}

export default new LoadByEmail()