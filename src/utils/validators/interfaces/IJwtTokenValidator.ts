export default interface IJwtTokenValidator {
  validate (token: string, secret: string): boolean
}