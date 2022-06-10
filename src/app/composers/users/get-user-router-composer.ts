import GetUser from '../../cases/users/get-user'
import GetUserRouter from '../../routers/users/get-user-router'

import { loadUserByIdRepository } from '../../../infra/repositories/users'
import { uuidv4Validator } from '../../../utils/validators'
import httpResponse from '../../../utils/http/response/http-response'

const getUser = new GetUser(
  loadUserByIdRepository, 
  uuidv4Validator
)

const getUserRouter = new GetUserRouter(
  getUser, 
  httpResponse
)

export {
  getUserRouter,
  getUser
}
