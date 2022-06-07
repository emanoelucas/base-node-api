const userMock = require('../../../../__mocks__/user-model-mock')
import { saveUser } from '../../../../src/infra/repositories/users'
import MissingParamError from '../../../../src/utils/erros/missing-param-error'
import User from '../../../../src/infra/database/models/user'

jest.mock('./../../../../src/infra/database/models/user', () => {
  return userMock
})

describe('save repository', () => {
	
  it('should throw if no name is provided', async () => {
    const promise = saveUser.save('', 'lastName', 'phoneNumber', 'email@mail.com', 'password')
    expect(promise).rejects.toThrow(new MissingParamError('name'))
	})
  it('should throw if no lastName is provided', async () => {
    const promise = saveUser.save('name', '', 'phoneNumber', 'email@mail.com', 'password')
    expect(promise).rejects.toThrow(new MissingParamError('lastName'))
	})
  it('should throw if no phoneNumber is provided', async () => {
    const promise = saveUser.save('name', 'lastName', '', 'email@mail.com', 'password')
    expect(promise).rejects.toThrow(new MissingParamError('phoneNumber'))
	})
  it('should throw if no email is provided', async () => {
    const promise = saveUser.save('name', 'lastName', 'phoneNumber', '', 'password')
    expect(promise).rejects.toThrow(new MissingParamError('email'))
	})
  it('should throw if no password is provided', async () => {
    const promise = saveUser.save('name', 'lastName', 'phoneNumber', 'email@mail.com', '')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
	})
  it('should save the user', async () => {
    const userParams = {
      name: 'name',
      lastName: 'lastName',
      phoneNumber: 'phoneNumber',
      email: 'mail@mail.com',
      password: 'password'
    }
    const user = await saveUser.save(userParams.name, userParams.lastName, userParams.phoneNumber, userParams.email, userParams.password)
    expect(user).toMatchObject(userParams)
	})
})