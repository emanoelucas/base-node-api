
import GetUser from '../../../../../src/app/cases/users/get-user'

import { NotFoundError } from '../../../../../src/utils/http/erros'

const { userDataMock } = require('../../../../../__mocks__/user-model-mock')
import { loadUserByIdRepository } from '../../../../../src/infra/repositories/users'
import { uuidv4Validator } from '../../../../../src/utils/validators'

jest.mock('../../../../../src/infra/repositories/users/load-user-by-id-repository')
jest.mock('../../../../../src/utils/validators/uuidv4-validator')

const loadUserByIdRepositoryMock = loadUserByIdRepository as jest.Mocked<typeof loadUserByIdRepository>
const uuidv4ValidatorMock = uuidv4Validator as jest.Mocked<typeof uuidv4Validator>

const buildCase = () => {
  return new GetUser(
    loadUserByIdRepositoryMock,
    uuidv4ValidatorMock
  )
}

const runCase = (getUser: GetUser) => {
  return getUser.get(
    userDataMock.id
  )
}

describe ('Get User Case', () => {

  it('should throws if uuidv4Validator throws', async () => {
    
    const getUser = buildCase()

    uuidv4ValidatorMock.validate.mockImplementation(() => {throw new Error()})

    const promise = runCase(getUser)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throws if loadUserByIdRepository throws', async () => {
    
    const getUser = buildCase()

    uuidv4ValidatorMock.validate.mockImplementation()
    loadUserByIdRepositoryMock.load.mockImplementation(() => {throw new Error()})

    const promise = runCase(getUser)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throws if the user is not found', async () => {
    
    const getUser = buildCase()

    uuidv4ValidatorMock.validate.mockImplementation()
    loadUserByIdRepositoryMock.load.mockResolvedValue(null)

    const promise = runCase(getUser)
    expect(promise).rejects.toThrow(NotFoundError)
  })

  it('should return the found user', async () => {
    
    const getUser = buildCase()

    uuidv4ValidatorMock.validate.mockImplementation()
    loadUserByIdRepositoryMock.load.mockResolvedValue(userDataMock)

    const promise = runCase(getUser)
    expect(promise).resolves.toBe(userDataMock)
  })

})