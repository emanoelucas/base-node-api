const { UserModelMock, userDataMock } = require('../../../../__mocks__/user-model-mock')
import { loadUserByIdRepository } from '../../../../src/infra/repositories/users'
import MissingParamError from '../../../../src/utils/erros/missing-param-error'

jest.mock('./../../../../src/infra/database/models/user', () => UserModelMock )

describe('Load user by id repository', () => {
	it('should return a user if is found', async () => {
    const id = userDataMock.id
    const user = await loadUserByIdRepository.load(id)
    expect(user?.id).toBe(id)
	})
  it('should return null no user is found', async () => {
    const id = 'wrong_id'
    const user = await loadUserByIdRepository.load(id)
    expect(user).toBeNull()
	})
  it('should throw if no id is provided', async () => {
    const id = ''
    const promise = loadUserByIdRepository.load(id)
    expect(promise).rejects.toThrow(new MissingParamError('id'))
	})
})