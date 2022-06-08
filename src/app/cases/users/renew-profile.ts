import { loadUserById, loadUserByEmail, updateUserProfile } from '../../../infra/repositories/users'
import { uuidv4Validator } from '../../../utils/validators'
import { BadRequestError, NotFoundError } from '../../../utils/http/erros'

class RenewProfile {
  private loadUserByEmail: typeof loadUserByEmail
  private loadUserById: typeof loadUserById
  private updateUserProfile: typeof updateUserProfile
  constructor() {
    this.loadUserByEmail = loadUserByEmail
    this.loadUserById = loadUserById
    this.updateUserProfile = updateUserProfile
  }

  async renew (id: string, name: string, lastName:string, phoneNumber: string, email: string) {
    
    uuidv4Validator.validate(id)
    const user = await this.loadUserById.load(id)
    if (!user)
      throw new NotFoundError('User not found')
    
    const knownEmail = await this.loadUserByEmail.load(email)
    if (knownEmail)
      throw new BadRequestError('Email already in use')


    return await this.updateUserProfile.update(user, name, lastName, phoneNumber, email)
  }
}

export default new RenewProfile()