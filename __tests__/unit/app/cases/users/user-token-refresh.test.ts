import UserTokenRefresh from '../../../../../src/app/cases/users/user-token-refresh'

import { UnauthorizedError, BadRequestError, NotFoundError } from '../../../../../src/utils/http/erros'

const { userDataMock } = require('../../../../../__mocks__/user-model-mock')
import { loadUserByIdRepository } from '../../../../../src/infra/repositories/users'
import { tokenGenerator } from '../../../../../src/utils/libraries'
import { jwtTokenValidator } from '../../../../../src/utils/validators'


jest.mock('../../../../../src/infra/repositories/users/load-user-by-id-repository')
jest.mock('../../../../../src/utils/libraries/token-generator')
jest.mock('../../../../../src/utils/validators/jwt-token-validator')

const jwtTokenValidatorMock = jwtTokenValidator as jest.Mocked<typeof jwtTokenValidator>
const loadUserByIdRepositoryMock = loadUserByIdRepository as jest.Mocked<typeof loadUserByIdRepository>
const tokenGeneratorMock = tokenGenerator as jest.Mocked<typeof tokenGenerator>

const buildCase = () => {
  return new UserTokenRefresh(
    loadUserByIdRepositoryMock,
    jwtTokenValidatorMock,
    tokenGeneratorMock
  )
}

const runCase = (userTokenRefresh: UserTokenRefresh) => {
  return userTokenRefresh.get(
    userDataMock.id,
    userDataMock.refreshToken
  )
}

describe ('User Token Refresh Case', () => {

  it('should throws if loadUserByIdRepository throws', async () => {
    
    const userTokenRefresh = buildCase()

    loadUserByIdRepositoryMock.load.mockImplementation(() => { throw new Error })

    const promise = runCase(userTokenRefresh)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throws if the user it is not found', async () => {
    
    const userTokenRefresh = buildCase()

    loadUserByIdRepositoryMock.load.mockResolvedValue(null)

    const promise = runCase(userTokenRefresh)
    expect(promise).rejects.toThrow(NotFoundError)
  })

  it('should throws if jwtTokenValidator throws', async () => {
    
    const userTokenRefresh = buildCase()

    loadUserByIdRepositoryMock.load.mockResolvedValue(userDataMock)
    jwtTokenValidatorMock.validate.mockImplementation(() => { throw new Error()})

    const promise = runCase(userTokenRefresh)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throws if the refresh token is invalid', async () => {
    
    const userTokenRefresh = buildCase()

    loadUserByIdRepositoryMock.load.mockResolvedValue(userDataMock)
    jwtTokenValidatorMock.validate.mockReturnValue(false)

    const promise = runCase(userTokenRefresh)
    expect(promise).rejects.toThrow(UnauthorizedError)
  })

  it('should throws if the user does not have a refresh token', async () => {
    
    const userTokenRefresh = buildCase()
    
    const invalidUserData: any = {}
    Object.assign(invalidUserData, userDataMock )
    delete invalidUserData.refreshToken
    
    loadUserByIdRepositoryMock.load.mockResolvedValue(invalidUserData)
    jwtTokenValidatorMock.validate.mockReturnValue(true)

    const promise = runCase(userTokenRefresh)
    expect(promise).rejects.toThrow(UnauthorizedError)
  })

  it('should throws if the user refresh token does not match', async () => {
    
    const userTokenRefresh = buildCase()
    
    const invalidUserData: any = {}
    Object.assign(invalidUserData, userDataMock )
    invalidUserData.refreshToken = 'different_refresh_token'
    
    loadUserByIdRepositoryMock.load.mockResolvedValue(invalidUserData)
    jwtTokenValidatorMock.validate.mockReturnValue(true)

    const promise = runCase(userTokenRefresh)
    expect(promise).rejects.toThrow(UnauthorizedError)
  })

  it('should throws if tokenGenerator throws', async () => {
    
    const userTokenRefresh = buildCase()
    
    loadUserByIdRepositoryMock.load.mockResolvedValue(userDataMock)
    jwtTokenValidatorMock.validate.mockReturnValue(true)
    tokenGeneratorMock.token.mockImplementation(() => { throw new Error() })

    const promise = runCase(userTokenRefresh)
    expect(promise).rejects.toThrow(Error)
  })

  it('should return the refreshed token', async () => {
    
    const userTokenRefresh = buildCase()
    const accessToken = 'access_token'

    loadUserByIdRepositoryMock.load.mockResolvedValue(userDataMock)
    jwtTokenValidatorMock.validate.mockReturnValue(true)
    tokenGeneratorMock.token.mockReturnValue(accessToken)

    const promise = runCase(userTokenRefresh)
    expect(promise).resolves.toBe(accessToken)
  })

})