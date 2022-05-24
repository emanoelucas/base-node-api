export interface IHttpResponse{
  message: string
  success: boolean
  data: Array<any> | Object
}