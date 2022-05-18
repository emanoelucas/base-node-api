export default class ForbiddenError extends Error {
  private status: number
  constructor (message: string) {
    super()
    this.status = 403
    this.name = 'ForbiddenError'
    this.message = message
  }
}