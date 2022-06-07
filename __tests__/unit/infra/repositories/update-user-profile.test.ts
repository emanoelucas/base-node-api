const userMock = require('../../../../__mocks__/user-model-mock')
import { updateUserProfile } from '../../../../src/infra/repositories/users'
import User from '../../../../src/infra/database/models/user'
import MissingParamError from '../../../../src/utils/erros/missing-param-error'

jest.mock('./../../../../src/infra/database/models/user', () => {
  return userMock
})

describe('update user profile repository', () => {
	
  it('should throw if no user is provided', async () => {
    const user: any = ''
    const promise = updateUserProfile.update(user, 'new_name', 'new_last_name', 'new_phone_number', 'new_email@mail.com')
    expect(promise).rejects.toThrow(new MissingParamError('user'))
	})
  it('should throw if no name is provided', async () => {
    const mockId = '03c22d45-4083-4224-a416-c8bdb4535470'
    const mockUser = await User.findOne({where: {id: mockId}})
    if(mockUser) {
      const promise = updateUserProfile.update(mockUser, '', 'new_last_name', 'new_phone_number', 'new_email@mail.com')
      expect(promise).rejects.toThrow(new MissingParamError('name'))
    }
	})
  it('should throw if no lastName is provided', async () => {
    const mockId = '03c22d45-4083-4224-a416-c8bdb4535470'
    const mockUser = await User.findOne({where: {id: mockId}})
    if(mockUser) {
      const promise = updateUserProfile.update(mockUser, 'new_name', '', 'new_phone_number', 'new_email@mail.com')
      expect(promise).rejects.toThrow(new MissingParamError('lastName'))
    }
	})
  it('should throw if no phoneNumber is provided', async () => {
    const mockId = '03c22d45-4083-4224-a416-c8bdb4535470'
    const mockUser = await User.findOne({where: {id: mockId}})
    if(mockUser) {
      const promise = updateUserProfile.update(mockUser, 'new_name', 'new_last_name', '', 'new_email@mail.com')
      expect(promise).rejects.toThrow(new MissingParamError('phoneNumber'))
    }
	})
  it('should throw if no email is provided', async () => {
    const mockId = '03c22d45-4083-4224-a416-c8bdb4535470'
    const mockUser = await User.findOne({where: {id: mockId}})
    if(mockUser) {
      const promise = updateUserProfile.update(mockUser, 'new_name', 'new_last_name', 'new_phone_number', '')
      expect(promise).rejects.toThrow(new MissingParamError('email'))
    }
	})

  it('should update the user profile', async () => {
    const mockId = '03c22d45-4083-4224-a416-c8bdb4535470'
    const mockUser = await User.findOne({where: {id: mockId}})
    
    if(mockUser)  {

      const newMockUser = mockUser

      newMockUser.name = 'new_name'
      newMockUser.lastName = 'new_last_name'
      newMockUser.phoneNumber = 'new_phone_number'
      newMockUser.email = 'new_email@mail.com'

      const updatedMockUser = await updateUserProfile.update(mockUser, newMockUser.name, newMockUser.lastName, newMockUser.phoneNumber, newMockUser.email)
      expect(updatedMockUser).toBe(newMockUser)

    }
	})
})