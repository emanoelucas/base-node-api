export default class InternalServerError extends Error {
  private status: number
  constructor (message: string) {
    super()
    this.status = 500
    this.name = 'InternalServerError'
    this.message = message
  }
}