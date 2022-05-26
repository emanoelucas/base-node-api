export interface IHttpError{
  status: number
  name: string
  message: string
  stack?: string
  errors?: Array<any>
}