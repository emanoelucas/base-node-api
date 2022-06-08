import jwt from 'jsonwebtoken'
import MissingParamError from '../erros/missing-param-error'

class TokenGeneration {
  
  private secret: string
  private refreshTokenLife: number
  private accessTokenLife: number
  constructor () {
    this.secret = process.env.JWT_SECRET as string
    this.refreshTokenLife = Number(process.env.JWT_REFRESH_TOKEN_LIFE)
    this.accessTokenLife = Number(process.env.JWT_TOKEN_LIFE)
  }

  token (data: any) {
    if (!data) 
      throw new MissingParamError('No jwt payload provided')
    
    return jwt.sign(data, this.secret, {
        expiresIn: this.accessTokenLife
      }
    )
  }

  refreshToken (data: any) {
    if (!data)
      throw new MissingParamError('No jwt payload provided')
    
    return jwt.sign(data, this.secret, {
        expiresIn: this.refreshTokenLife
      }
    )
  }
}

export default new TokenGeneration()