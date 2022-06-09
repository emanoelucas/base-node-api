import UserAuthentication from '../../../../../src/app/cases/users/user-authentication'

import { NotFoundError, BadRequestError } from '../../../../../src/utils/http/erros'

const { userDataMock } = require('../../../../../__mocks__/user-model-mock')
import { loadUserByEmailRepository, setUserParameterRepository } from '../../../../../src/infra/repositories/users'
import { encrypter, tokenGenerator } from '../../../../../src/utils/libraries'


jest.mock('../../../../../src/infra/repositories/users/load-user-by-email-repository')
jest.mock('../../../../../src/infra/repositories/users/set-user-parameter-repository')
jest.mock('../../../../../src/utils/libraries/encrypter')
jest.mock('../../../../../src/utils/libraries/token-generator')

const setUserParameterRepositoryMock = setUserParameterRepository as jest.Mocked<typeof setUserParameterRepository>
const loadUserByEmailRepositoryMock = loadUserByEmailRepository as jest.Mocked<typeof loadUserByEmailRepository>
const encrypterMock = encrypter as jest.Mocked<typeof encrypter>
const tokenGeneratorMock = tokenGenerator as jest.Mocked<typeof tokenGenerator>

const buildCase = () => {
  return new UserAuthentication(
    loadUserByEmailRepositoryMock,
    setUserParameterRepositoryMock,
    encrypterMock,
    tokenGeneratorMock
  )
}

const runCase = (userAuthentication: UserAuthentication) => {
  return userAuthentication.auth(
    userDataMock.email,
    userDataMock.password
  )
}

describe ('User Authentication Case', () => {

  it('should throws if loadUserByEmailRepository throws', async () => {
    
    const userAuthentication = buildCase()

    loadUserByEmailRepositoryMock.load.mockImplementation(() => { throw new Error })

    const promise = runCase(userAuthentication)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throws the user is not found', async () => {
    
    const userAuthentication = buildCase()

    loadUserByEmailRepositoryMock.load.mockResolvedValue(null)

    const promise = runCase(userAuthentication)
    expect(promise).rejects.toThrow(NotFoundError)
  })

  it('should throws encrypter throws', async () => {
    
    const userAuthentication = buildCase()

    loadUserByEmailRepositoryMock.load.mockResolvedValue(userDataMock)
    encrypterMock.compare.mockImplementation(() => { throw new Error })

    const promise = runCase(userAuthentication)
    expect(promise).rejects.toThrow(Error)
  })

  it('should if the provided password does not match hashedPassword', async () => {
    
    const userAuthentication = buildCase()

    loadUserByEmailRepositoryMock.load.mockResolvedValue(userDataMock)
    encrypterMock.compare.mockResolvedValue(false)

    const promise = runCase(userAuthentication)
    expect(promise).rejects.toThrow(BadRequestError)
  })

  it('should throw if tokenGeneration access token throws', async () => {
    
    const userAuthentication = buildCase()

    loadUserByEmailRepositoryMock.load.mockResolvedValue(userDataMock)
    encrypterMock.compare.mockResolvedValue(true)
    tokenGeneratorMock.token.mockImplementation(() => { throw new Error() })

    const promise = runCase(userAuthentication)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throw if tokenGeneration refresh token throws', async () => {
    
    const userAuthentication = buildCase()

    loadUserByEmailRepositoryMock.load.mockResolvedValue(userDataMock)
    encrypterMock.compare.mockResolvedValue(true)
    tokenGeneratorMock.token.mockReturnValue('access_token')
    tokenGeneratorMock.refreshToken.mockImplementation(() => { throw new Error() })

    const promise = runCase(userAuthentication)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throw if setUserParameterRepository throws', async () => {
    
    const userAuthentication = buildCase()

    loadUserByEmailRepositoryMock.load.mockResolvedValue(userDataMock)
    encrypterMock.compare.mockResolvedValue(true)
    tokenGeneratorMock.token.mockReturnValue('access_token')
    tokenGeneratorMock.refreshToken.mockReturnValue('refresh_token')
    setUserParameterRepositoryMock.set.mockImplementation( () => { throw new Error() })

    const promise = runCase(userAuthentication)
    expect(promise).rejects.toThrow(Error)
  })
  
  it('should return the user, access_token and token_refresh', async () => {
    
    const userAuthentication = buildCase()

    loadUserByEmailRepositoryMock.load.mockResolvedValue(userDataMock)
    encrypterMock.compare.mockResolvedValue(true)
    tokenGeneratorMock.token.mockReturnValue('access_token')
    tokenGeneratorMock.refreshToken.mockReturnValue('refresh_token')
    setUserParameterRepositoryMock.set.mockResolvedValue(userDataMock)

    const promise = runCase(userAuthentication)
    expect(promise).resolves.toStrictEqual({
      user: userDataMock,
      accessToken: 'access_token',
      refreshToken: 'refresh_token'
    })
  })
})