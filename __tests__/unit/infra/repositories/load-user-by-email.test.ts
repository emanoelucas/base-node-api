const userMock = require('../../../../__mocks__/user-model-mock')
import { loadUserByEmail } from '../../../../src/infra/repositories/users'
import MissingParamError from '../../../../src/utils/erros/missing-param-error'

jest.mock('./../../../../src/infra/database/models/user', () => {
  return userMock
})

describe('Load user by email repository', () => {
	it('should return a user if is found', async () => {
    const mockEmail = 'john@mail.com'
    const user = await loadUserByEmail.load(mockEmail)
    expect(user?.email).toBe(mockEmail)
	})
  it('should return null no user is found', async () => {
    const mockEmail = 'notFoundEmail@mail.com'
    const user = await loadUserByEmail.load(mockEmail)
    expect(user).toBeNull()
	})
  it('should throw if no email is provided', async () => {
    const mockEmail = ''
    const promise = loadUserByEmail.load(mockEmail)
    expect(promise).rejects.toThrow(new MissingParamError('email'))
	})
})