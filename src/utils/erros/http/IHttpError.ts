export interface IHttpError{
  status: number
  name: string
  message: string
  stack?: string
}