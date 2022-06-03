import InvalidParamError from "../erros/invalid-param-error"
import MissingParamError from "../erros/missing-param-error"
import { BadRequestError } from "../http/erros"

export default (requiredParams: Array<string>, receivedData: any) => {
  
  if (!Array.isArray(requiredParams))
    throw new InvalidParamError('requiredParams is not an array')
  if (!requiredParams.length)
    throw new MissingParamError('requiredParams')
  if (!receivedData)
    throw new MissingParamError('receivedData')
  

  let missingParams: Array<string> = []
  const receivedParams = Object.keys(receivedData)

  requiredParams.forEach(param => {
    if (!receivedParams.includes(param))
      missingParams.push(param)
  })

  if (!missingParams.length)
    return 
  throw new BadRequestError(`Missing fields: ${missingParams.join(', ')}.`)
}
