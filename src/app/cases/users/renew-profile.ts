import { loadUserById } from '../../../infra/repositories/users'
import uuidv4Validator from '../../../utils/validators/uuidv4-validator'
import updateUser from '../../../infra/repositories/users/update-user'
import { NotFoundError } from '../../../utils/http/erros'

class RenewProfile {
  private loadUserById: typeof loadUserById
  private updateUser: typeof updateUser
  constructor() {
    this.loadUserById = loadUserById
    this.updateUser = updateUser
  }

  async renew (id: string, name: string, lastName:string, phoneNumber: string, email: string) {
    
    uuidv4Validator(id)
    const user = await this.loadUserById.load(id)
    if (!user)
      throw new NotFoundError('User not found')

    return await this.updateUser.update(user, name, lastName, phoneNumber, email)
  }
}

export default new RenewProfile()