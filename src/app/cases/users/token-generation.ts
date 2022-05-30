import jwt from 'jsonwebtoken'

class TokenGeneration {
  
  private secret: string
  
  constructor () {
    this.secret = process.env.JWT_SECRET as string
  }

  token (data: any) {
    return jwt.sign(data, this.secret, {
      expiresIn: Number(process.env.JWT_TOKEN_LIFE)
    })
  }

  refreshToken (data: any) {
    return jwt.sign(data, this.secret, {
      expiresIn: Number(process.env.JWT_REFRESH_TOKEN_LIFE)
    })
  }
}

export default new TokenGeneration()