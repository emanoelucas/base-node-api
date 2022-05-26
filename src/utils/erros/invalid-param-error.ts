export default class InvalidParamError extends Error {
  constructor (param: string) {
    super()
    this.name = 'InvalidParamError'
    this.message = `Invalid params: ${param}`
  }
}
