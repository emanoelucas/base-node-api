export default interface IEncrypter {
  hash (password: string, salt: number | string): Promise<string>
  compare (password: string, hashedPassword: string): Promise<boolean>
}