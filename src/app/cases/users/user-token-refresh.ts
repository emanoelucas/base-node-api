
import { ILoadUserByIdRepository } from '../../../infra/repositories/users/interfaces'
import { IJwtTokenValidator } from '../../../utils/validators/interfaces'
import { NotFoundError, UnauthorizedError } from "../../../utils/http/erros"
import { ITokenGenerator } from '../../../utils/libraries/interfaces'

class UserTokenRefresh {
  
  constructor (
    private loadUserByIdRepository: ILoadUserByIdRepository,
    private jwtTokenValidator: IJwtTokenValidator,
    private tokenGenerator: ITokenGenerator
  ) { }

  async get (id: string, token: string) {

    const user = await this.loadUserByIdRepository.load(id)
    if (!user) {
      throw new NotFoundError('User not found')
    }
    
    const validRefreshToken = this.jwtTokenValidator.validate(token, process.env.JWT_SECRET as string)
    if(!validRefreshToken)
      throw new UnauthorizedError('Invalid refresh token, please log in again.')

    if (!user.refreshToken || user.refreshToken !== token)
      throw new UnauthorizedError('Invalid user refresh token')

    const accessToken = this.tokenGenerator.token({ sub: user.id }) 
    
    return accessToken
  }
}

export default UserTokenRefresh
