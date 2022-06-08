import UpdateUser from "../../cases/users/update-user"
import UpdateUserRouter from "../../routers/users/update-user-router"

import { updateUserProfileRepository,loadUserByEmailRepository, loadUserByIdRepository } from "../../../infra/repositories/users"
import { requestBodyValidator, uuidv4Validator } from "../../../utils/validators"

const updateUser = new UpdateUser(
  loadUserByIdRepository, loadUserByEmailRepository, updateUserProfileRepository, uuidv4Validator
)

const updateUserRouter = new UpdateUserRouter(
  updateUser, requestBodyValidator
)

export default updateUserRouter
