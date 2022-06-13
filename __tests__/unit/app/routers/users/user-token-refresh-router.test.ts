const { UserModelMock, userDataMock } = require('../../../../../__mocks__/user-model-mock')
import { Request, Response } from 'express'

import UserTokenRefreshRouter from '../../../../../src/app/routers/users/user-token-refresh-router'
import { userTokenRefresh } from '../../../../../src/app/composers/users/user-token-refresh-router-composer'

import { requestBodyValidator } from '../../../../../src/utils/validators'
import httpResponse from '../../../../../src/utils/http/response/http-response'

jest.mock('../../../../../src/app/cases/users/user-token-refresh')
jest.mock('../../../../../src/utils/validators/request-body-validator')
jest.mock('../../../../../src/utils/http/response/http-response')
jest.mock('../../../../../src/infra/database/models/user', () => UserModelMock)

const requestBodyValidatorMock = requestBodyValidator as jest.Mocked<typeof requestBodyValidator>
const userTokenRefreshMock = userTokenRefresh as jest.Mocked<typeof userTokenRefresh>
const httpResponseMock = httpResponse as jest.Mocked<typeof httpResponse>

const buildRouter = () => {
  return new UserTokenRefreshRouter(
    userTokenRefreshMock,
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

describe ('User Token Refresh Router', () => {

  afterEach(() => {
    responseResult = null
  })
  
  it('should throw if requestBodyValidator throws', async () => {
    
    const request = buildRequest({})
    
    requestBodyValidatorMock.validate.mockImplementation(() => { throw new Error() })

    const userTokenRefreshRouter = buildRouter()
    const promise = userTokenRefreshRouter.get(request, response as Response, next)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throw if userTokenRefresh throws', async () => {
    
    const request = buildRequest({
      body: {
        id: userDataMock.id,
        refreshToken: userDataMock.refreshToken
      }
    })
    
    requestBodyValidatorMock.validate.mockImplementation()
    userTokenRefreshMock.get.mockImplementation(() => { throw new Error() })

    const userTokenRefreshRouter = buildRouter()
    const promise = userTokenRefreshRouter.get(request, response as Response, next)
    expect(promise).rejects.toThrow(Error)
  })
  
  it('should throw if httpResponse throws', async () => {
    
    const request = buildRequest({
      body: {
        id: userDataMock.id,
        refreshToken: userDataMock.refreshToken
      }
    })
    const accessToken = 'access_token'
    
    requestBodyValidatorMock.validate.mockImplementation()
    userTokenRefreshMock.get.mockResolvedValue(accessToken)
    httpResponseMock.success.mockImplementation( () => { throw new Error() } )

    const userTokenRefreshRouter = buildRouter()
    const promise = userTokenRefreshRouter.get(request, response as Response, next)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throw if res.send throws', async () => {
    
    const request = buildRequest({
      body: {
        id: userDataMock.id,
        refreshToken: userDataMock.refreshToken
      }
    })
    
    const successResponse = {
      message: '',
      data: [],
      success: true
    }
    const accessToken = 'access_token'

    requestBodyValidatorMock.validate.mockImplementation()
    userTokenRefreshMock.get.mockResolvedValue(accessToken)
    httpResponseMock.success.mockReturnValue(successResponse)

    const userTokenRefreshRouter = buildRouter()
    const promise = userTokenRefreshRouter.get(request, responseError as Response, next)
    expect(promise).rejects.toThrow(Error)
  })
  
  it('should respond with the data and success message', async () => {
    
    const request = buildRequest({
      body: {
        id: userDataMock.id,
        refreshToken: userDataMock.refreshToken
      }
    })
    
    const accessToken = 'access_token'

    const successResponse = {
      message: 'Token refreshed',
      data: {
        accessToken: accessToken
      },
      success: true
    }
   
    requestBodyValidatorMock.validate.mockImplementation()
    userTokenRefreshMock.get.mockResolvedValue(accessToken)
    httpResponseMock.success.mockReturnValue(successResponse)

    const userTokenRefreshRouter = buildRouter()
    await userTokenRefreshRouter.get(request, response as Response, next)
    expect(responseResult).toStrictEqual(successResponse)
  })

})