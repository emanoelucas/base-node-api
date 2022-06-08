import { BadRequestError, NotFoundError } from '../../../utils/http/erros'
import { IUpdateUserRepository, ILoadUserByIdRepository, ILoadUserByEmailRepository } from '../../../infra/repositories/users/interfaces'
import { IUuidv4Validator } from '../../../utils/validators/interfaces'

class UpdateUser {

  constructor(
    private loadUserByIdRepository: ILoadUserByIdRepository,
    private loadUserByEmailRepository: ILoadUserByEmailRepository,
    private updateUserRepository: IUpdateUserRepository,
    private uuidv4Validator: IUuidv4Validator
  ) { }

  async update (id: string, name: string, lastName:string, phoneNumber: string, email: string) {
    
    this.uuidv4Validator.validate(id)
    const user = await this.loadUserByIdRepository.load(id)
    if (!user)
      throw new NotFoundError('User not found')
    
    const knownEmail = await this.loadUserByEmailRepository.load(email)
    if (knownEmail)
      throw new BadRequestError('Email already in use')

    return await this.updateUserRepository.update(user, name, lastName, phoneNumber, email)
  }
}

export default UpdateUser