import { IHttpDefaultResponse } from "./IHttpDefaultResponse"
import { InternalServerError } from "../erros"

class HttpResponse {
  build (params: any, success: boolean = true) {

    if (!params.message || !params.data)
      throw new InternalServerError('Invalid response pattern')

    const defaultResponse: IHttpDefaultResponse = {
      message: params.message,
      data: params.data,
      success: success
    }

    return Object.assign(defaultResponse, params)
  }
}

export default new HttpResponse()
