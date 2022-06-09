const { UserModelMock, userDataMock } = require('../../../../__mocks__/user-model-mock')
import { loadUserByEmailRepository } from '../../../../src/infra/repositories/users'
import MissingParamError from '../../../../src/utils/erros/missing-param-error'

jest.mock('./../../../../src/infra/database/models/user', () => UserModelMock )

describe('Load user by email repository', () => {
	it('should return a user if is found', async () => {
    const email = userDataMock.email
    const user = await loadUserByEmailRepository.load(email)
    expect(user?.email).toBe(email)
	})
  it('should return null no user is found', async () => {
    const email = 'notFoundEmail@mail.com'
    const user = await loadUserByEmailRepository.load(email)
    expect(user).toBeNull()
	})
  it('should throw if no email is provided', async () => {
    const email = ''
    const promise = loadUserByEmailRepository.load(email)
    expect(promise).rejects.toThrow(new MissingParamError('email'))
	})
})