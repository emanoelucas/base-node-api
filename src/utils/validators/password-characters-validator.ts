import { BadRequestError } from "../http/erros"

class PasswordCharactersValidator {
  validate (password: string) {
    if ( !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password) )
      throw new BadRequestError('Its needed a minimum of 8 characters, with at least one letter and one number')
  }
}

export default new PasswordCharactersValidator()
