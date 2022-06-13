const { UserModelMock, userDataMock } = require('../../../../../__mocks__/user-model-mock')
import { Request, Response } from 'express'

import GetUserRouter from '../../../../../src/app/routers/users/get-user-router'
import { getUser } from '../../../../../src/app/composers/users/get-user-router-composer'

import httpResponse from '../../../../../src/utils/http/response/http-response'

jest.mock('../../../../../src/app/cases/users/get-user')
jest.mock('../../../../../src/utils/http/response/http-response')
jest.mock('../../../../../src/infra/database/models/user', () => UserModelMock)

const getUserMock = getUser as jest.Mocked<typeof getUser>
const httpResponseMock = httpResponse as jest.Mocked<typeof httpResponse>

const buildRouter = () => {
  return new GetUserRouter(
    getUserMock,
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

describe ('Get User Router', () => {

  afterEach(() => {
    responseResult = null
  })
  
  it('should throw if getUser throws', async () => {
    
    const request = buildRequest({
      user: {
        sub: 'user_id'
      }
    })
    
    getUserMock.get.mockImplementation( () => { throw new Error() })

    const getUserRouter = buildRouter()
    const promise = getUserRouter.get(request, response as Response, next)
    expect(promise).rejects.toThrow(Error)
  })
  
  it('should throw if httpResponse throws', async () => {
    
    const request = buildRequest({
      user: {
        sub: 'user_id'
      }
    })
    
    getUserMock.get.mockResolvedValue(userDataMock)
    httpResponseMock.success.mockImplementation(() => { throw new Error() })

    const getUserRouter = buildRouter()
    const promise = getUserRouter.get(request, response as Response, next)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throw if res.send throws', async () => {
    
    const request = buildRequest({
      user: {
        sub: 'user_id'
      }
    })

    const successResponse = { 
      message: 'User retrieved',
      data: {
        user: userDataMock
      },
      success: true
    }

    getUserMock.get.mockImplementation(userDataMock)
    httpResponseMock.success.mockReturnValue(successResponse)

    const getUserRouter = buildRouter()
    const promise = getUserRouter.get(request, responseError as Response, next)
    expect(promise).rejects.toThrow(Error)
  })
  
  it('should respond with the data and success message', async () => {

    const request = buildRequest({
      user: {
        sub: 'user_id'
      }
    })

    const successResponse = { 
      message: 'User retrieved',
      data: {
        user: userDataMock
      },
      success: true
    }

    getUserMock.get.mockResolvedValue(userDataMock)
    httpResponseMock.success.mockReturnValue(successResponse)

    const getUserRouter = buildRouter()
    await getUserRouter.get(request, response as Response, next)
    expect(responseResult).toStrictEqual(successResponse)
  })
  
})