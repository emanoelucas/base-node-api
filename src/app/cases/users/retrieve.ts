import { loadUserById } from '../../../infra/repositories/users'
import { NotFoundError } from '../../../utils/http/erros'
class Retrieve {
  private loadUserById: typeof loadUserById
  constructor() {
    this.loadUserById = loadUserById
  }

  async run (id: string) {
    const user = await this.loadUserById.load(id)
    if (!user)
      throw new NotFoundError('User not found')
    return user
  }
}

export default new Retrieve()