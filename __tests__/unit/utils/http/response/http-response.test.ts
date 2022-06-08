import MissingParamError from "../../../../../src/utils/erros/missing-param-error"
import { InternalServerError } from "../../../../../src/utils/http/erros"
import httpResponse from "../../../../../src/utils/http/response/http-response"

describe ('http response', () => {
  it('should throw on fail if no params are provided', () => {
    const params = ''
    expect( () => {httpResponse.fail(params)}).toThrow(new InternalServerError('Invalid fail response pattern'))
  })
  it('should throw on fail if no message is provided', () => {
    const params = {}
    expect( () => {httpResponse.fail(params)}).toThrow(new MissingParamError('Missing fail response message'))
  })
  it('should return on fail default result', () => {
    const params = {
      message: 'fail on ...'
    }
    const result = httpResponse.fail(params)
    expect(result).toStrictEqual({
      message: params.message,
      success: false
    })
  })
  it('should return on fail default result and extras params', () => {
    const params = {
      message: 'fail on ...',
      code: '400'
    }
    const result = httpResponse.fail(params)
    expect(result).toStrictEqual({
      message: params.message,
      success: false,
      code: '400'
    })
  })
  it('should throw on success if no params are provided', () => {
    const params = ''
    expect( () => {httpResponse.success(params)}).toThrow(new InternalServerError('Invalid sucess response pattern'))
  })
  it('should throw on success if no message is provided', () => {
    const params = {}
    expect( () => {httpResponse.success(params)}).toThrow(new InternalServerError('Invalid sucess response pattern'))
  })
  it('should throw on success if no message data are provided', () => {
    const params = {}
    expect( () => {httpResponse.success(params)}).toThrow(new InternalServerError('Invalid sucess response pattern'))
  })
  it('should return on success default result', () => {
    const params = {
      message: 'succeed..',
      data: {},
      success: true
    }
    const result = httpResponse.success(params)
    expect(result).toStrictEqual({
      message: params.message,
      data: params.data,
      success: true
    })
  })
  it('should return on success default result and extras params', () => {
    const params = {
      message: 'succeed..',
      data: {},
      success: true,
      warning: 'warning'
    }
    const result = httpResponse.fail(params)
    expect(result).toStrictEqual({
      message: params.message,
      success: true,
      data: params.data,
      warning: 'warning'
    })
  })
})

