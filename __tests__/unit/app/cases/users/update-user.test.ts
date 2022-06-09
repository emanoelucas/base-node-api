import UpdateUser from '../../../../../src/app/cases/users/update-user'

import { NotFoundError, BadRequestError } from '../../../../../src/utils/http/erros'

const { userDataMock, userDataMock2 } = require('../../../../../__mocks__/user-model-mock')
import { loadUserByIdRepository, loadUserByEmailRepository, updateUserRepository } from '../../../../../src/infra/repositories/users'
import { uuidv4Validator } from '../../../../../src/utils/validators'

jest.mock('../../../../../src/infra/repositories/users/load-user-by-id-repository')
jest.mock('../../../../../src/infra/repositories/users/load-user-by-email-repository')
jest.mock('../../../../../src/infra/repositories/users/update-user-repository')
jest.mock('../../../../../src/utils/validators/uuidv4-validator')

const updateUserRepositoryMock = updateUserRepository as jest.Mocked<typeof updateUserRepository>
const loadUserByEmailRepositoryMock = loadUserByEmailRepository as jest.Mocked<typeof loadUserByEmailRepository>
const loadUserByIdRepositoryMock = loadUserByIdRepository as jest.Mocked<typeof loadUserByIdRepository>
const uuidv4ValidatorMock = uuidv4Validator as jest.Mocked<typeof uuidv4Validator>

const buildCase = () => {
  return new UpdateUser(
    loadUserByIdRepositoryMock,
    loadUserByEmailRepositoryMock,
    updateUserRepositoryMock,
    uuidv4ValidatorMock
  )
}

const runCase = (updateUser: UpdateUser) => {
  return updateUser.update(
    userDataMock.id,
    userDataMock.name,
    userDataMock.lastName,
    userDataMock.phoneNumber,
    userDataMock.email
  )
}

describe ('Update User Case', () => {

  it('should throws if uuidv4Validator throws', async () => {
    
    const updateUser = buildCase()

    uuidv4ValidatorMock.validate.mockImplementation(()=>{throw new Error})

    const promise = runCase(updateUser)
    expect(promise).rejects.toThrow(Error)
  })
  
  it('should throws if the user is not found', async () => {
    
    const updateUser = buildCase()

    uuidv4ValidatorMock.validate.mockImplementation()
    loadUserByIdRepositoryMock.load.mockResolvedValue(null)

    const promise = runCase(updateUser)
    expect(promise).rejects.toThrow(NotFoundError)
  })
  
  it('should throws if loadUserByEmailRepository throws', async () => {
    
    const updateUser = buildCase()

    uuidv4ValidatorMock.validate.mockImplementation()
    loadUserByIdRepositoryMock.load.mockResolvedValue(userDataMock)
    loadUserByEmailRepositoryMock.load.mockImplementation(() => {throw new Error()})

    const promise = runCase(updateUser)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throws if the email belongs to someone else', async () => {
    
    const updateUser = buildCase()

    uuidv4ValidatorMock.validate.mockImplementation()
    loadUserByIdRepositoryMock.load.mockResolvedValue(userDataMock)
    loadUserByEmailRepositoryMock.load.mockResolvedValue(userDataMock2)

    const promise = runCase(updateUser)
    expect(promise).rejects.toThrow(BadRequestError)
  })

  it('should throws if updateUserRepository throws', async () => {
    
    const updateUser = buildCase()

    uuidv4ValidatorMock.validate.mockImplementation()
    loadUserByIdRepositoryMock.load.mockResolvedValue(userDataMock)
    loadUserByEmailRepositoryMock.load.mockResolvedValue(userDataMock)
    updateUserRepositoryMock.update.mockImplementation(() => { throw new Error() })

    const promise = runCase(updateUser)
    expect(promise).rejects.toThrow(Error)
  })

  it('should return the updated user', async () => {
    
    const updateUser = buildCase()

    uuidv4ValidatorMock.validate.mockImplementation()
    loadUserByIdRepositoryMock.load.mockResolvedValue(userDataMock)
    loadUserByEmailRepositoryMock.load.mockResolvedValue(userDataMock)
    updateUserRepositoryMock.update.mockResolvedValue(userDataMock)

    const promise = runCase(updateUser)
    expect(promise).resolves.toBe(userDataMock)
  })

})