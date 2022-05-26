import { IHttpDefaultResponse } from "./IHttpDefaultResponse"
import { InternalServerError } from "../erros"
import MissingParamError from "../../erros/missing-param-error"

class HttpResponse {
  
  fail (params: any) {
    
    if (typeof params !== 'object')
      throw new InternalServerError('Invalid fail response pattern')

    if (!params.message)
      throw new MissingParamError('Missing fail response message')
    
    const response = {
      message: params.message,
      sucess: false
    }
    return Object.assign(response, params)
    
  }

  sucess (params: any ) {
    if ( typeof params !== 'object' || !params.message || !params.data )
      throw new InternalServerError('Invalid sucess response pattern')

    const defaultResponse: IHttpDefaultResponse = {
      message: params.message,
      data: params.data,
      success: true
    }

    return Object.assign(defaultResponse, params)
  }
}

export default new HttpResponse()
