import GetUser from '../../cases/users/get-user'
import GetUserRouter from '../../routers/users/get-user-router'

import { loadUserByIdRepository } from '../../../infra/repositories/users'
import { uuidv4Validator } from '../../../utils/validators'

const getUser = new GetUser(
  loadUserByIdRepository, uuidv4Validator
)

const getUserRouter = new GetUserRouter(getUser)

export default getUserRouter
