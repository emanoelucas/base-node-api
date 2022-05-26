import jwt from 'jsonwebtoken'

class TokenGeneration {
  
  async generate (data: any) {
    
    const secret = process.env.JWT_SECRET as string
    
    return jwt.sign(data, secret, {
      expiresIn: Number(process.env.JWT_EXPIRATION_TIME),
      algorithm: 'HS256'
    })
  }
}

export default new TokenGeneration()