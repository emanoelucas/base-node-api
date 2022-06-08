import { BadRequestError } from "../../../../src/utils/http/erros"
import {passwordCharactersValidator} from '../../../../src/utils/validators'

describe('Required Password validator', () => {
  it('should throw if is less than 8 characters', () => {
    const password = '1234567'
    expect(() => { passwordCharactersValidator.validate(password) }).toThrow(BadRequestError)
	})
  it('should throw if only has numbers', () => {
    const password = '12345678'
    expect(() => { passwordCharactersValidator.validate(password) }).toThrow(BadRequestError)
	})
  it('should throw if only has letters', () => {
    const password = 'abcdefgh'
    expect(() => { passwordCharactersValidator.validate(password) }).toThrow(BadRequestError)
	})
  it('should proceed if it has 8 or more characters with at least 1 number and one letter', () => {
    const password = 'abcdefgh12'
    expect(passwordCharactersValidator.validate(password)).toBeUndefined()
	})
})