import { BadRequestError } from "../../../../src/utils/http/erros"
import requiredPassword from '../../../../src/utils/validators/required-characters-password-validator'

describe('Required Password validator', () => {
  it('should throw if is less than 8 characters', () => {
    const password = '1234567'
    expect(() => { requiredPassword(password) }).toThrow(BadRequestError)
	})
  it('should throw if only has numbers', () => {
    const password = '12345678'
    expect(() => { requiredPassword(password) }).toThrow(BadRequestError)
	})
  it('should throw if only has letters', () => {
    const password = 'abcdefgh'
    expect(() => { requiredPassword(password) }).toThrow(BadRequestError)
	})
})