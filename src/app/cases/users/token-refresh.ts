
import { loadUserById } from '../../../infra/repositories/users'
import jwtTokenValidator from '../../../utils/validators/jwt-token-validator'
import { NotFoundError, UnauthorizedError } from "../../../utils/http/erros"

class TokenRefresh {
  
  private loadUserById: typeof loadUserById
  constructor () {
    this.loadUserById = loadUserById
  }

  async run (id: string, token: string) {

    const user = await this.loadUserById.load(id)
    if (!user) {
      throw new NotFoundError('User not found')
    }
    
    const validRefreshToken = jwtTokenValidator(token, process.env.JWT_SECRET as string)
    if(!validRefreshToken)
      throw new UnauthorizedError('Invalid refresh token, please log in again.')

    if (!user.refreshToken || user.refreshToken !== token)
      throw new UnauthorizedError('Invalid user refresh token')
    
    return user
  }
}

export default new TokenRefresh()