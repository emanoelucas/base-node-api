export default interface IRequestBodyValidator {
  validate (requiredParams: Array<string>, receivedData: any): void
}