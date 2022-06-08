const userMock = require('../../../../__mocks__/user-model-mock')
import { loadUserByIdRepository } from '../../../../src/infra/repositories/users'
import MissingParamError from '../../../../src/utils/erros/missing-param-error'

jest.mock('./../../../../src/infra/database/models/user', () => {
  return userMock
})

describe('Load user by id repository', () => {
	it('should return a user if is found', async () => {
    const mockId = '03c22d45-4083-4224-a416-c8bdb4535470'
    const user = await loadUserByIdRepository.load(mockId)
    expect(user?.id).toBe(mockId)
	})
  it('should return null no user is found', async () => {
    const mockId = 'wrong_id'
    const user = await loadUserByIdRepository.load(mockId)
    expect(user).toBeNull()
	})
  it('should throw if no id is provided', async () => {
    const mockId = ''
    const promise = loadUserByIdRepository.load(mockId)
    expect(promise).rejects.toThrow(new MissingParamError('id'))
	})
})