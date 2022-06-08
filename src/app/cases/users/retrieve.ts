import { loadUserById } from '../../../infra/repositories/users'
import { NotFoundError } from '../../../utils/http/erros'
import { uuidv4Validator } from '../../../utils/validators'
class Retrieve {
  private loadUserById: typeof loadUserById
  private uuidv4Validator: typeof uuidv4Validator
  constructor() {
    this.loadUserById = loadUserById
    this.uuidv4Validator = uuidv4Validator
  }

  async run (id: string) {
    
    this.uuidv4Validator.validate(id)
    
    const user = await this.loadUserById.load(id)
    if (!user)
      throw new NotFoundError('User not found')
    return user
  }
}

export default new Retrieve()