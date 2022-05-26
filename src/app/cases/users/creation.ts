import { saveUser, loadUserByEmail } from '../../../infra/repositories/users'
import { BadRequestError } from '../../../utils/http/erros'
import encrypter from '../../../utils/libraries/encrypter'
import equalPasswordsValidator from '../../../utils/validators/equal-passwords-validator'
import requiredPasswordChar from '../../../utils/validators/required-characters-password-validator'

class Creation {
  private saveUser: typeof saveUser
  private loadByEmail: typeof loadUserByEmail
  private encrypter: typeof encrypter
  private equalPassword: typeof equalPasswordsValidator
  private requiredPasswordChar: typeof requiredPasswordChar
  constructor() {
    this.saveUser = saveUser
    this.loadByEmail = loadUserByEmail
    this.encrypter = encrypter
    this.equalPassword = equalPasswordsValidator
    this.requiredPasswordChar = requiredPasswordChar
  }

  async create (name: string, lastName:string, phoneNumber: string, email: string, password: string, repeatPassword: string) {
    
    const user = await this.loadByEmail.load(email)
    if (user) 
      throw new BadRequestError('This email is already in use')
    
    const equalPassword = this.equalPassword(password, repeatPassword)
    if (!equalPassword)
      throw new BadRequestError('Passwords are no equals')
    
    this.requiredPasswordChar(password)

    const hashedPassword = await this.encrypter.hash(password)

    return await this.saveUser.save(name, lastName, phoneNumber, email, hashedPassword)
  }
}

export default new Creation()
