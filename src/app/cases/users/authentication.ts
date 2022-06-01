
import { loadUserByEmail } from '../../../infra/repositories/users'
import encrypter from '../../../utils/libraries/encrypter'
import { NotFoundError, BadRequestError } from "../../../utils/http/erros"
class Authentication {
  
  private loadUserByEmail: typeof loadUserByEmail
  private encrypter: typeof encrypter
  constructor () {
    this.loadUserByEmail = loadUserByEmail
    this.encrypter = encrypter
  }

  async auth (email: string, password: string) {

    const includePassword = {
        attributes: {
        include: ['password']
      }
    }

    const user = await this.loadUserByEmail.load(email, includePassword)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    const validPassword = await this.encrypter.compare(password, user.password)
    if (!validPassword)
      throw new BadRequestError('Password incorrect')

    return user
  }
}

export default new Authentication()