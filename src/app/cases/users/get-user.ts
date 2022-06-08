import { ILoadUserByIdRepository } from '../../../infra/repositories/users/interfaces'
import { NotFoundError } from '../../../utils/http/erros'
import { IUuidv4Validator } from '../../../utils/validators/interfaces'

class GetUser {

  constructor(
    private loadUserByIdRepository: ILoadUserByIdRepository,
    private uuidv4Validator: IUuidv4Validator
  ) { }

  async get (id: string) {
    
    this.uuidv4Validator.validate(id)
    
    const user = await this.loadUserByIdRepository.load(id)
    if (!user)
      throw new NotFoundError('User not found')
    return user
  }
}

export default GetUser