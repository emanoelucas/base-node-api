const { UserModelMock, userDataMock } = require('../../../../../__mocks__/user-model-mock')
import { Request, Response } from 'express'

import UpdateUserRouter from '../../../../../src/app/routers/users/update-user-router'
import { updateUser } from '../../../../../src/app/composers/users/update-user-router-composer'

import { requestBodyValidator } from '../../../../../src/utils/validators'
import httpResponse from '../../../../../src/utils/http/response/http-response'

jest.mock('../../../../../src/app/cases/users/update-user')
jest.mock('../../../../../src/utils/validators/request-body-validator')
jest.mock('../../../../../src/utils/http/response/http-response')
jest.mock('../../../../../src/infra/database/models/user', () => UserModelMock)

const requestBodyValidatorMock = requestBodyValidator as jest.Mocked<typeof requestBodyValidator>
const updateUserMock = updateUser as jest.Mocked<typeof updateUser>
const httpResponseMock = httpResponse as jest.Mocked<typeof httpResponse>

const buildRouter = () => {
  return new UpdateUserRouter(
    updateUserMock, 
    requestBodyValidatorMock,
    httpResponseMock
  )
}

const buildRequest = (data: any) => data as Request

const next = (data: any) => {
  throw new Error()
}

let responseResult: any
const response: Partial<Response> = {
  send: jest.fn().mockImplementation((result) => {
    responseResult = result 
  })
}

const responseError: Partial<Response> = {
  send: jest.fn().mockImplementation(() => { throw new Error() })
} 

describe ('Update User Router', () => {

  afterEach(() => {
    responseResult = null
  })

  it('should throw if requestBodyValidator throws', async () => {
    
    const request = buildRequest({})
    
    requestBodyValidatorMock.validate.mockImplementation(() => { throw new Error() })

    const updateUserRouter = buildRouter()
    const promise = updateUserRouter.update(request, response as Response, next)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throw if updateUser throws', async () => {
    
    const request = buildRequest({
      body: {
        name: userDataMock.name,
        lastName: userDataMock.lastName,
        phoneNumber: userDataMock.phoneNumber,
        email: userDataMock.email
      },
      user: {
        sub: 'user_id'
      }
    })
    
    requestBodyValidatorMock.validate.mockImplementation()
    updateUserMock.update.mockImplementation(() => { throw new Error() })

    const updateUserRouter = buildRouter()
    const promise = updateUserRouter.update(request, response as Response, next)
    expect(promise).rejects.toThrow(Error)
  })
  
  it('should throw if httpResponse throws', async () => {
    
    const request = buildRequest({
      body: {
        name: userDataMock.name,
        lastName: userDataMock.lastName,
        phoneNumber: userDataMock.phoneNumber,
        email: userDataMock.email
      },
      user: {
        sub: 'user_id'
      }
    })
    
    requestBodyValidatorMock.validate.mockImplementation()
    updateUserMock.update.mockResolvedValue(userDataMock)
    httpResponseMock.success.mockImplementation(() => { throw new Error() })

    const updateUserRouter = buildRouter()
    const promise = updateUserRouter.update(request, response as Response, next)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throw if res.send throws', async () => {
    
    const request = buildRequest({
      body: {
        name: userDataMock.name,
        lastName: userDataMock.lastName,
        phoneNumber: userDataMock.phoneNumber,
        email: userDataMock.email
      },
      user: {
        sub: 'user_id'
      }
    })
    
    const successResponse = {
      message: 'Data updated',
      data: {
        user: userDataMock
      },
      success: true
    }

    requestBodyValidatorMock.validate.mockImplementation()
    updateUserMock.update.mockResolvedValue(userDataMock)
    httpResponseMock.success.mockReturnValue(successResponse)

    const updateUserRouter = buildRouter()
    const promise = updateUserRouter.update(request, responseError as Response, next)
    expect(promise).rejects.toThrow(Error)
  })

  it('should respond with the data and success message', async () => {
    
    const request = buildRequest({
      body: {
        name: userDataMock.name,
        lastName: userDataMock.lastName,
        phoneNumber: userDataMock.phoneNumber,
        email: userDataMock.email
      },
      user: {
        sub: 'user_id'
      }
    })
    
    const successResponse = {
      message: 'Data updated',
      data: {
        user: userDataMock
      },
      success: true
    }

    requestBodyValidatorMock.validate.mockImplementation()
    updateUserMock.update.mockResolvedValue(userDataMock)
    httpResponseMock.success.mockReturnValue(successResponse)

    const updateUserRouter = buildRouter()
    await updateUserRouter.update(request, response as Response, next)
    expect(responseResult).toStrictEqual(successResponse)
  })

})