export default interface IEqualPasswordsValidator {
  validate (password: string, repeatPassword: string): boolean
}