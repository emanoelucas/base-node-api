const userMock = require('../../../../__mocks__/user-model-mock')
import { setUserParameterRepository } from '../../../../src/infra/repositories/users'
import User from '../../../../src/infra/database/models/user'
import MissingParamError from '../../../../src/utils/erros/missing-param-error'

jest.mock('./../../../../src/infra/database/models/user', () => {
  return userMock
})

describe('set user parameter repository', () => {
	
  it('should throw if no user is provided', async () => {
    const user: any = ''
    const promise = setUserParameterRepository.set(user, 'paramName', 'paramValue')
    expect(promise).rejects.toThrow(new MissingParamError('user'))
	})
  it('should throw if no paramName is provided', async () => {
    const mockId = '03c22d45-4083-4224-a416-c8bdb4535470'
    const mockUser = await User.findOne({where: {id: mockId}})
    if(mockUser) {
      const promise = setUserParameterRepository.set(mockUser, '', 'new_last_name')
      expect(promise).rejects.toThrow(new MissingParamError('paramName'))
    }
	})
  it('should throw if no lastName is provided', async () => {
    const mockId = '03c22d45-4083-4224-a416-c8bdb4535470'
    const mockUser = await User.findOne({where: {id: mockId}})
    if(mockUser) {
      const promise = setUserParameterRepository.set(mockUser, 'paramName', '')
      expect(promise).rejects.toThrow(new MissingParamError('paramValue'))
    }
	})
 

  it('should set the user parameter', async () => {
    const mockId = '03c22d45-4083-4224-a416-c8bdb4535470'
    const mockUser = await User.findOne({where: {id: mockId}})
    
    if(mockUser)  {
      const newMockUser = mockUser

      newMockUser.refreshToken = 'new_refesh_token'

      const updatedMockUser = await setUserParameterRepository.set(mockUser, 'refreshToken', newMockUser.refreshToken)
      expect(updatedMockUser).toBe(newMockUser)

    }
	})
})