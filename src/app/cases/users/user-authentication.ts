import { NotFoundError, BadRequestError } from "../../../utils/http/erros"
import { IEncrypter, ITokenGenerator } from '../../../utils/libraries/interfaces'
import { ILoadUserByEmailRepository, ISetUserParameterRepository } from '../../../infra/repositories/users/interfaces'

class UserAuthentication {
  
  constructor (
    private loadUserByEmailRepository: ILoadUserByEmailRepository,
    private setUserParameterRepository: ISetUserParameterRepository,
    private encrypter: IEncrypter,
    private tokenGeneration: ITokenGenerator
  ) {}

  async auth (email: string, password: string) {

    let user = await this.loadUserByEmailRepository.load(email)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    const validPassword = await this.encrypter.compare(password, user.password)
    if (!validPassword)
      throw new BadRequestError('Password incorrect')

    const accessToken = this.tokenGeneration.token({ sub: user.id }) 
    const refreshToken = this.tokenGeneration.refreshToken({ sub: user.id })
    user = await this.setUserParameterRepository.set(user, 'refreshToken', refreshToken)
    
    return {
      user, accessToken, refreshToken
    }
  }
}

export default UserAuthentication