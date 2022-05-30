import jwt from 'jsonwebtoken'
import MissingParamError from '../erros/missing-param-error'

export default (token: string) => {

  if (!token)
    throw new MissingParamError('token')

  try {
    jwt.verify(token, process.env.JWT_SECRET as string)
    return true
  } catch (err) {
    return false
  }
}
