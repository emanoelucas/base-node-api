import CreateUser from '../../../../../src/app/cases/users/create-user'

import { BadRequestError } from '../../../../../src/utils/http/erros'

const { userDataMock } = require('../../../../../__mocks__/user-model-mock')
import { loadUserByEmailRepository, saveUserRepository } from '../../../../../src/infra/repositories/users'
import { equalPasswordsValidator, passwordCharactersValidator } from '../../../../../src/utils/validators'
import { encrypter } from '../../../../../src/utils/libraries'

jest.mock('../../../../../src/infra/repositories/users/load-user-by-email-repository')
jest.mock('../../../../../src/infra/repositories/users/save-user-repository')
jest.mock('../../../../../src/utils/validators/equal-passwords-validator')
jest.mock('../../../../../src/utils/validators/password-characters-validator')
jest.mock('../../../../../src/utils/libraries/encrypter')

const loadUserByEmailRepositoryMock = loadUserByEmailRepository as jest.Mocked<typeof loadUserByEmailRepository>
const saveUserRepositoryMock = saveUserRepository as jest.Mocked<typeof saveUserRepository>
const encrypterMock = encrypter as jest.Mocked<typeof encrypter>
const equalPasswordsValidatorMock = equalPasswordsValidator as jest.Mocked<typeof equalPasswordsValidator>
const passwordCharactersValidatorMock = passwordCharactersValidator as jest.Mocked<typeof passwordCharactersValidator>

const buildCase = () => {
  return new CreateUser(
    loadUserByEmailRepositoryMock,
    saveUserRepositoryMock, 
    encrypterMock, 
    equalPasswordsValidatorMock, 
    passwordCharactersValidatorMock
  )
}

const runCase = (createUser: CreateUser) => {
  return createUser.create(
    userDataMock.name,
    userDataMock.lastName,
    userDataMock.phoneNumber,
    userDataMock.email,
    userDataMock.password,
    userDataMock.password
  )
}

describe ('Create User Case', () => {

  it('should throws if loadUserByEmailRepository throws', async () => {
    
    const createUser = buildCase()

    loadUserByEmailRepositoryMock.load.mockImplementation(() => {throw new Error()})

    const promise = runCase(createUser)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throw if the email already exists', async () => {
    
    const createUser = buildCase()

    loadUserByEmailRepositoryMock.load.mockResolvedValue(userDataMock)

    const promise = runCase(createUser)
    expect(promise).rejects.toThrow(new BadRequestError('This email is already in use'))
  })

  it('should throw if equalPasswordsValidator throws', async () => {
    
    const createUser = buildCase()

    loadUserByEmailRepositoryMock.load.mockResolvedValue(null)
    equalPasswordsValidatorMock.validate.mockImplementation(() => {throw new Error()})

    const promise = runCase(createUser)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throw if the passwords are different', async () => {
    
    const createUser = buildCase()

    loadUserByEmailRepositoryMock.load.mockResolvedValue(null)
    equalPasswordsValidatorMock.validate.mockReturnValue(false)

    const promise = runCase(createUser)
    expect(promise).rejects.toThrow(new BadRequestError('Passwords are no equals'))
  })

  it('should throw if passwordCharactersValidator throws', async () => {
    
    const createUser = buildCase()

    loadUserByEmailRepositoryMock.load.mockResolvedValue(null)
    equalPasswordsValidatorMock.validate.mockReturnValue(true)
    passwordCharactersValidatorMock.validate.mockImplementation(() => {throw new Error()})

    const promise = runCase(createUser)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throw if the password does not match the requirements', async () => {
    
    const createUser = buildCase()

    loadUserByEmailRepositoryMock.load.mockResolvedValue(null)
    equalPasswordsValidatorMock.validate.mockReturnValue(true)
    passwordCharactersValidatorMock.validate.mockImplementation(() => {throw new BadRequestError('')})

    const promise = runCase(createUser)
    expect(promise).rejects.toThrow(BadRequestError)
  })

  it('should throw if encrypter throws', async () => {
    
    const createUser = buildCase()

    loadUserByEmailRepositoryMock.load.mockResolvedValue(null)
    equalPasswordsValidatorMock.validate.mockReturnValue(true)
    passwordCharactersValidatorMock.validate.mockImplementation()
    encrypterMock.hash.mockImplementation(() => {throw new Error()})

    const promise = runCase(createUser)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throw if saveUserRepository throws', async () => {
    
    const createUser = buildCase()

    loadUserByEmailRepositoryMock.load.mockResolvedValue(null)
    equalPasswordsValidatorMock.validate.mockReturnValue(true)
    passwordCharactersValidatorMock.validate.mockImplementation()
    encrypterMock.hash.mockImplementation(() => Promise.resolve('hashedPassword'))
    saveUserRepositoryMock.save.mockImplementation(() => {throw new Error()})

    const promise = runCase(createUser)
    expect(promise).rejects.toThrow(Error)
  })

  it('should return the created user', async () => {
    
    const createUser = buildCase()

    loadUserByEmailRepositoryMock.load.mockResolvedValue(null)
    equalPasswordsValidatorMock.validate.mockReturnValue(true)
    passwordCharactersValidatorMock.validate.mockImplementation()
    encrypterMock.hash.mockImplementation(() => Promise.resolve('hashedPassword'))
    saveUserRepositoryMock.save.mockResolvedValue(userDataMock)

    const promise = runCase(createUser)
    expect(promise).resolves.toBe(userDataMock)
  })
})
