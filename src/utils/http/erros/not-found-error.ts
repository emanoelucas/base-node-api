export default class NotFoundError extends Error {
  private status: number
  constructor (message: string) {
    super()
    this.status = 404
    this.name = 'NotFoundError'
    this.message = message
  }
}