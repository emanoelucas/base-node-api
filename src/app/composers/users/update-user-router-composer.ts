import UpdateUser from "../../cases/users/update-user"
import UpdateUserRouter from "../../routers/users/update-user-router"

import { updateUserRepository,loadUserByEmailRepository, loadUserByIdRepository } from "../../../infra/repositories/users"
import { requestBodyValidator, uuidv4Validator } from "../../../utils/validators"
import httpResponse from '../../../utils/http/response/http-response'

const updateUser = new UpdateUser(
  loadUserByIdRepository, loadUserByEmailRepository, updateUserRepository, uuidv4Validator
)

const updateUserRouter = new UpdateUserRouter(
  updateUser, requestBodyValidator, httpResponse
)

export {
  updateUserRouter,
  updateUser
}
