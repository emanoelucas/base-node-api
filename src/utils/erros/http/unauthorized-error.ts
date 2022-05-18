export default class UnauthorizedError extends Error {
  private status: number
  constructor (message: string) {
    super()
    this.status = 401
    this.name = 'UnauthorizedError'
    this.message = message
  }
}