export default class BadRequestError extends Error {
  private status: number
  constructor (message: string ) {
    super()
    this.status = 400
    this.name = 'BadRequestError'
    this.message = message
  }
}
