import jwt from 'jsonwebtoken'
import MissingParamError from '../erros/missing-param-error'

class JwtTokenValidator {

  validate (token: string, secret: string) {
    if (!token)
      throw new MissingParamError('token')
    if (!secret)
      throw new MissingParamError('secret')

    try {
      jwt.verify(token, secret)
      return true
    } catch (err) {
      return false
    }
  }
}
export default new JwtTokenValidator()
