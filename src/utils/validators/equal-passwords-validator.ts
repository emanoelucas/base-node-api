import MissingParamError from "../erros/missing-param-error"

class EqualPasswordsValidator {
  
  validate (password: string, repeatPassword: string) {
    if (!password)
      throw new MissingParamError('password')
    if (!repeatPassword)
      throw new MissingParamError('repeat password')

    return password === repeatPassword
  }
}

export default new EqualPasswordsValidator()
