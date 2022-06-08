
import { BadRequestError } from '../../../utils/http/erros'
import { IEncrypter } from '../../../utils/libraries/interfaces'
import { IEqualPasswordsValidator, IPasswordCharactersValidator } from '../../../utils/validators/interfaces'
import { ISaveUserRepository, ILoadUserByEmailRepository } from '../../../infra/repositories/users/interfaces'

class CreateUser {

  constructor(
    private loadUserByEmailRepository: ILoadUserByEmailRepository,
    private saveUserRepository: ISaveUserRepository,
    private encrypter: IEncrypter,
    private equalPasswordsValidator: IEqualPasswordsValidator,
    private passwordCharactersValidator: IPasswordCharactersValidator

  ) { }

  async create (name: string, lastName:string, phoneNumber: string, email: string, password: string, repeatPassword: string) {
    
    const user = await this.loadUserByEmailRepository.load(email)
    if (user) 
      throw new BadRequestError('This email is already in use')
    
    const equalPassword = this.equalPasswordsValidator.validate(password, repeatPassword)
    if (!equalPassword)
      throw new BadRequestError('Passwords are no equals')
    
    this.passwordCharactersValidator.validate(password)

    const hashedPassword = await this.encrypter.hash(password, Number(process.env.ENCRYPTER_SALT))

    return await this.saveUserRepository.save(name, lastName, phoneNumber, email, hashedPassword)
  }
}

export default CreateUser
