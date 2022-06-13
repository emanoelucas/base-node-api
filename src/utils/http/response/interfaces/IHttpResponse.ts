import IHttpDefaultResponse from "./IHttpDefaultResponse"
export default interface IHttpResponse {
  fail (params: any): IHttpDefaultResponse
  success (params: any): IHttpDefaultResponse
}
