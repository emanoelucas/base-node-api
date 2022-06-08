import MissingParamError from '../../../../src/utils/erros/missing-param-error'
import { jwtTokenValidator } from '../../../../src/utils/validators'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')
const mockedJwt = jwt as jest.Mocked<typeof jwt>

describe('jwt Token Validator', () => {
	it('should throw if no token is provided', () => {
		const token = ''
    const secret = 'secret'
    expect(() => { jwtTokenValidator.validate(token, secret) }).toThrow(new MissingParamError('token'))
	})
  it('should throw if no secret is provided', () => {
		const token = 'token'
    const secret = ''
    expect(() => { jwtTokenValidator.validate(token, secret) }).toThrow(new MissingParamError('secret'))
	})
  it('should return true if its a valid jwt token', () => {
		const token = 'valid_token'
    const secret = 'secret'
    mockedJwt.verify.mockReturnValue()
    const isValid = jwtTokenValidator.validate(token, secret)
    expect(isValid).toBe(true)
	})
  it('should return false if its a invalid jwt token', () => {
		const token = 'invalid_token'
    const secret = 'secret'
    mockedJwt.verify.mockImplementation(() => {
      throw new Error()
    })
    const isValid = jwtTokenValidator.validate(token, secret)
    expect(isValid).toBe(false)
	})
})