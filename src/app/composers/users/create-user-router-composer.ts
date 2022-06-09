import CreateUser from '../../cases/users/create-user'
import CreateUserRouter from '../../routers/users/create-user-router'

import { loadUserByEmailRepository, saveUserRepository } from '../../../infra/repositories/users'
import { equalPasswordsValidator, passwordCharactersValidator } from '../../../utils/validators'
import { encrypter } from '../../../utils/libraries'
import { requestBodyValidator } from "../../../utils/validators"
import httpResponse from '../../../utils/http/response/http-response'

const createUser = new CreateUser(
  loadUserByEmailRepository, saveUserRepository, encrypter, equalPasswordsValidator, passwordCharactersValidator
)

const createUserRouter = new CreateUserRouter(
  createUser, requestBodyValidator, httpResponse
)

export {
  createUserRouter,
  createUser
}
