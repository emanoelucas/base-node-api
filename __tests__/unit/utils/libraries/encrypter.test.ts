import MissingParamError from '../../../../src/utils/erros/missing-param-error'
import bcrypt from 'bcrypt'
import encrypter from '../../../../src/utils/libraries/encrypter'

jest.mock('bcrypt')
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>

describe('Encrypter', () => {
  
  afterEach(() => {
    jest.resetAllMocks()
  })

	it('should throw during hash if no password is provided', async () => {
		const password = ''
    const salt = '10'
    const promise = encrypter.hash(password, salt)
    expect(promise).rejects.toThrow(new MissingParamError('password'))
	})
  it('should throw during hash if no salt is provided', async () => {
		const password = '1234'
    const salt = ''
    const promise = encrypter.hash(password, salt)
    expect(promise).rejects.toThrow(new MissingParamError('hash salt'))
	})
  it('should throw during compare if no password is provided', async () => {
		const password = ''
    const hashedPassword = '@!#$%*()_+'
    const promise = encrypter.compare(password, hashedPassword)
    expect(promise).rejects.toThrow(new MissingParamError('password'))
	})
  it('should throw during compare if no hashedpassword is provided', async () => {
		const password = '1234567890'
    const hashedPassword = ''
    const promise = encrypter.compare(password, hashedPassword)
    expect(promise).rejects.toThrow(new MissingParamError('password hash'))
	})
  it('should encrypt the password', async () => {
		const password = '1234567890'
    const salt = '10'
    mockedBcrypt.hash.mockImplementation(() => Promise.resolve('hashedPassword'))
    const promise = encrypter.hash(password, salt)
    expect(promise).resolves.toBeDefined()
	})
  it('should return false when password and hashedPassword do not match', async () => {
		const password = '1234567890'
    const hashedPassword = 'invalid_hashed_password'
    mockedBcrypt.compare.mockImplementation(() => Promise.resolve(false))
    const promise = encrypter.compare(password, hashedPassword)
    expect(promise).resolves.toBe(false)
	})
  it('should return true when password and hashedPassword match', async () => {
		const password = '1234567890'
    const hashedPassword = 'valid_hashed_password'
    mockedBcrypt.compare.mockImplementation(() => Promise.resolve(true))
    const promise = encrypter.compare(password, hashedPassword)
    expect(promise).resolves.toBe(true)
	})
})