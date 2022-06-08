import MissingParamError from '../../../../src/utils/erros/missing-param-error'
import { equalPasswordsValidator } from '../../../../src/utils/validators'

describe('Equal passwords validator', () => {
	it('should throw if no password is provided', () => {
		const password = ''
    const repeatPassword = '1234'
    expect(() => { equalPasswordsValidator.validate(password, repeatPassword) }).toThrow(new MissingParamError('password'))
	})
  it('should throw if no repeatPassword is provided', () => {
		const password = '1234'
    const repeatPassword = ''
    expect(() => { equalPasswordsValidator.validate(password, repeatPassword) }).toThrow(new MissingParamError('repeat password'))
	})
  it('should return false if the passwords are not equals', () => {
		const password = '1234'
    const repeatPassword = '1235'
    const isEqual = equalPasswordsValidator.validate(password, repeatPassword)
    expect(isEqual).toBe(false)
	})
  it('should return true if the passwords are equals', () => {
		const password = '1234'
    const repeatPassword = '1234'
    const isEqual = equalPasswordsValidator.validate(password, repeatPassword)
    expect(isEqual).toBe(true)
	})
})