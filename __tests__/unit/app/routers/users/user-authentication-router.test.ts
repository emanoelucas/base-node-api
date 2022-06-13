const { UserModelMock, userDataMock } = require('../../../../../__mocks__/user-model-mock')
import { Request, Response } from 'express'

import UserAuthenticationRouter from '../../../../../src/app/routers/users/user-authentication-router'
import { userAuthentication } from '../../../../../src/app/composers/users/user-authentication-router-composer'

import { requestBodyValidator } from '../../../../../src/utils/validators'
import httpResponse from '../../../../../src/utils/http/response/http-response'

jest.mock('../../../../../src/app/cases/users/user-authentication')
jest.mock('../../../../../src/utils/validators/request-body-validator')
jest.mock('../../../../../src/utils/http/response/http-response')
jest.mock('../../../../../src/infra/database/models/user', () => UserModelMock)

const requestBodyValidatorMock = requestBodyValidator as jest.Mocked<typeof requestBodyValidator>
const userAuthenticationMock = userAuthentication as jest.Mocked<typeof userAuthentication>
const httpResponseMock = httpResponse as jest.Mocked<typeof httpResponse>

const buildRouter = () => {
  return new UserAuthenticationRouter(
    userAuthenticationMock,
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

describe ('User Authentication Router', () => {

  afterEach(() => {
    responseResult = null
  })

  it('should throw if requestBodyValidator throws', async () => {
    
    const request = buildRequest({})
    
    requestBodyValidatorMock.validate.mockImplementation(() => { throw new Error() })

    const userAuthenticationRouter = buildRouter()
    const promise = userAuthenticationRouter.sign(request, response as Response, next)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throw if userAuthentication throws', async () => {
    
    const request = buildRequest({
      body: {
        email: userDataMock.email,
        password: userDataMock.password
      }
    })
    
    requestBodyValidatorMock.validate.mockImplementation()
    userAuthenticationMock.auth.mockImplementation(() => { throw new Error() })

    const userAuthenticationRouter = buildRouter()
    const promise = userAuthenticationRouter.sign(request, response as Response, next)
    expect(promise).rejects.toThrow(Error)
  })
  
  it('should throw if httpResponse throws', async () => {
    
    const request = buildRequest({
      body: {
        email: userDataMock.email,
        password: userDataMock.password
      }
    })
    
    requestBodyValidatorMock.validate.mockImplementation()
    userAuthenticationMock.auth.mockResolvedValue({
      user: userDataMock,
      accessToken: 'access_token',
      refreshToken: 'refresh_token'
    })
    httpResponseMock.success.mockImplementation( () => { throw new Error() })

    const userAuthenticationRouter = buildRouter()
    const promise = userAuthenticationRouter.sign(request, response as Response, next)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throw if res.send throws', async () => {
    
    const request = buildRequest({
      body: {
        email: userDataMock.email,
        password: userDataMock.password
      }
    })
    const authData = {
      user: userDataMock,
      accessToken: 'access_token',
      refreshToken: 'refresh_token'
    }
    const successResponse = {
      message: 'You are logged in', 
      data: {
        user: userDataMock, 
        tokens: {
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken
        }
      },
      success: true
    }

    requestBodyValidatorMock.validate.mockImplementation()
    userAuthenticationMock.auth.mockResolvedValue(authData)
    httpResponseMock.success.mockReturnValue(successResponse)

    const userAuthenticationRouter = buildRouter()
    const promise = userAuthenticationRouter.sign(request, responseError as Response, next)
    expect(promise).rejects.toThrow(Error)
  })

  it('should respond with the data and success message', async () => {
    
    const request = buildRequest({
      body: {
        email: userDataMock.email,
        password: userDataMock.password
      }
    })
    const authData = {
      user: userDataMock,
      accessToken: 'access_token',
      refreshToken: 'refresh_token'
    }
    const successResponse = {
      message: 'You are logged in', 
      data: {
        user: userDataMock, 
        tokens: {
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken
        }
      },
      success: true
    }
    
    requestBodyValidatorMock.validate.mockImplementation()
    userAuthenticationMock.auth.mockResolvedValue(authData)
    httpResponseMock.success.mockReturnValue(successResponse)

    const userAuthenticationRouter = buildRouter()
    await userAuthenticationRouter.sign(request, response as Response, next)
    expect(responseResult).toStrictEqual(successResponse)
  })

})