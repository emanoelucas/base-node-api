import UpdateUser from "../../cases/users/update-user"
import UpdateUserRouter from "../../routers/users/update-user-router"

import { updateUserRepository,loadUserByEmailRepository, loadUserByIdRepository } from "../../../infra/repositories/users"
import { requestBodyValidator, uuidv4Validator } from "../../../utils/validators"

const updateUser = new UpdateUser(
  loadUserByIdRepository, loadUserByEmailRepository, updateUserRepository, uuidv4Validator
)

const updateUserRouter = new UpdateUserRouter(
  updateUser, requestBodyValidator
)

export default updateUserRouter
