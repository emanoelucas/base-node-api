import MissingParamError from '../../../../src/utils/erros/missing-param-error'
import InvalidParamError from '../../../../src/utils/erros/invalid-param-error'
import { BadRequestError } from '../../../../src/utils/http/erros'
import requestBodyValidator from '../../../../src/utils/validators/request-body-validator'

describe('Request body validator', () => {
  it('should throw if requiredParams is not an array', () => {
		const requiredParams: any = {}
    const receivedData = {}
    expect(() => { requestBodyValidator(requiredParams, receivedData) }).toThrow(new InvalidParamError('requiredParams is not an array'))
	})
  it('should throw if no requiredParams are provided', () => {
		const requiredParams: any = []
    const receivedData = {}
    expect(() => { requestBodyValidator(requiredParams, receivedData) }).toThrow(new MissingParamError('requiredParams'))
	})
  it('should throw if no receivedData are provided', () => {
		const requiredParams: any = ['field1', 'field2']
    const receivedData: any = ''
    expect(() => { requestBodyValidator(requiredParams, receivedData) }).toThrow(new MissingParamError('receivedData'))
	})
  it('should proceed if receivedData match all requiredParams', () => {
		const requiredParams: any = ['field1', 'field2']
    const receivedData: any = {field1: 'value1', field2: 'value2'}
    expect(requestBodyValidator(requiredParams, receivedData)).toBeUndefined()
	})
  it('should throw if receivedData does not match the requiredParams', () => {
		const requiredParams: any = ['field1', 'field2']
    const receivedData: any = {field1: 'value1', field3: 'value3'}
    expect(() => { requestBodyValidator(requiredParams, receivedData) }).toThrow(BadRequestError)
	})
})