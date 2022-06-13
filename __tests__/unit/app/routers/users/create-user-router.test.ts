const { UserModelMock, userDataMock } = require('../../../../../__mocks__/user-model-mock')
import { Request, Response } from 'express'

import CreateUserRouter from '../../../../../src/app/routers/users/create-user-router'
import { createUser } from '../../../../../src/app/composers/users/create-user-router-composer'

import { requestBodyValidator } from '../../../../../src/utils/validators'
import httpResponse from '../../../../../src/utils/http/response/http-response'

jest.mock('../../../../../src/app/cases/users/create-user')
jest.mock('../../../../../src/utils/validators/request-body-validator')
jest.mock('../../../../../src/utils/http/response/http-response')
jest.mock('../../../../../src/infra/database/models/user', () => UserModelMock)

const requestBodyValidatorMock = requestBodyValidator as jest.Mocked<typeof requestBodyValidator>
const createUserMock = createUser as jest.Mocked<typeof createUser>
const httpResponseMock = httpResponse as jest.Mocked<typeof httpResponse>

const buildRouter = () => {
  return new CreateUserRouter(
    createUserMock, 
    requestBodyValidatorMock,
    httpResponseMock
  )
}

const buildRequest = (data: any) => {
  return {
    body: data
  } as Request
}

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

describe ('Create User Router', () => {

  afterEach(() => {
    responseResult = null
  })

  it('should throw if requestBodyValidator throws', async () => {
    
    const request = buildRequest({})
    
    requestBodyValidatorMock.validate.mockImplementation(() => { throw new Error() })

    const createUserRouter = buildRouter()
    const promise = createUserRouter.sign(request, response as Response, next)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throw if createUser throws', async () => {
    
    const request = buildRequest({
      name: userDataMock.name,
      lastName: userDataMock.lastName,
      phoneNumber: userDataMock.phoneNumber,
      email: userDataMock.email,
      password: userDataMock.password,
      repeatPassword: userDataMock.password
    })
    
    requestBodyValidatorMock.validate.mockImplementation()
    createUserMock.create.mockImplementation(() => { throw new Error() })

    const createUserRouter = buildRouter()
    const promise = createUserRouter.sign(request, response as Response, next)
    expect(promise).rejects.toThrow(Error)
  })
  
  it('should throw if httpResponse throws', async () => {
    
    const request = buildRequest({
      name: userDataMock.name,
      lastName: userDataMock.lastName,
      phoneNumber: userDataMock.phoneNumber,
      email: userDataMock.email,
      password: userDataMock.password,
      repeatPassword: userDataMock.password
    })
    
    requestBodyValidatorMock.validate.mockImplementation()
    createUserMock.create.mockResolvedValue(userDataMock)
    httpResponseMock.success.mockImplementation(() => { throw new Error() })

    const createUserRouter = buildRouter()
    const promise = createUserRouter.sign(request, response as Response, next)
    expect(promise).rejects.toThrow(Error)
  })

  it('should throw if res.send throws', async () => {
    
    const request = buildRequest({
      name: userDataMock.name,
      lastName: userDataMock.lastName,
      phoneNumber: userDataMock.phoneNumber,
      email: userDataMock.email,
      password: userDataMock.password,
      repeatPassword: userDataMock.password
    })

    const successResponse = {
      message: 'Account created',
      data: {
        user: userDataMock
      },
      success: true
    }
    requestBodyValidatorMock.validate.mockImplementation()
    createUserMock.create.mockResolvedValue(userDataMock)
    httpResponseMock.success.mockReturnValue(successResponse)

    const createUserRouter = buildRouter()
    const promise = createUserRouter.sign(request, responseError as Response, next)
    expect(promise).rejects.toThrow(Error)
  })

  it('should respond with the data and success message', async () => {
    
    const request = buildRequest({
      name: userDataMock.name,
      lastName: userDataMock.lastName,
      phoneNumber: userDataMock.phoneNumber,
      email: userDataMock.email,
      password: userDataMock.password,
      repeatPassword: userDataMock.password
    })

    const successResponse = {
      message: 'Account created',
      data: {
        user: userDataMock
      },
      success: true
    }
    
    requestBodyValidatorMock.validate.mockImplementation()
    createUserMock.create.mockResolvedValue(userDataMock)
    httpResponseMock.success.mockReturnValue(successResponse)

    const createUserRouter = buildRouter()
    await createUserRouter.sign(request, response as Response, next)
    expect(responseResult).toStrictEqual(successResponse)
  })

})