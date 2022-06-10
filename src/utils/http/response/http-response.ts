import { InternalServerError } from "../erros"
import MissingParamError from "../../erros/missing-param-error"
import IHttpDefaultResponse from "./interfaces/IHttpDefaultResponse"
class HttpResponse {
  
  fail (params: any) {
    
    if (!params)
      throw new InternalServerError('Invalid fail response pattern')

    if (!params.message)
      throw new MissingParamError('Missing fail response message')
    
    const defaultResponse: IHttpDefaultResponse = {
      message: params.message,
      data: {},
      success: false
    }
    Object.assign(defaultResponse, params)
    return defaultResponse
    
  }

  success (params: any ) {
    if ( !params || !params.message || !params.data )
      throw new InternalServerError('Invalid sucess response pattern')

    const defaultResponse: IHttpDefaultResponse = {
      message: params.message,
      data: params.data,
      success: true
    }

    Object.assign(defaultResponse, params)
    return defaultResponse
  }
}

export default new HttpResponse()
