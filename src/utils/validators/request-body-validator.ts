import { BadRequestError } from "../http/erros"

export default (requiredParams: Array<string>, receivedData: any) => {
  
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
