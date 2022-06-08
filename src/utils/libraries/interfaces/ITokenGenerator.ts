export default interface ITokenGenerator {
  token (data: any): string
  refreshToken (data: any): string
}