import UserTokenRefresh from "../../cases/users/user-token-refresh"
import UserTokenRefreshRouter from "../../routers/users/user-token-refresh-router"

import { loadUserByIdRepository } from "../../../infra/repositories/users"
import { tokenGenerator } from '../../../utils/libraries'
import { jwtTokenValidator, requestBodyValidator } from "../../../utils/validators"
import httpResponse from '../../../utils/http/response/http-response'

const userTokenRefresh = new UserTokenRefresh(
  loadUserByIdRepository, jwtTokenValidator, tokenGenerator
)

const userTokenRefreshRouter = new UserTokenRefreshRouter(
  userTokenRefresh, requestBodyValidator, httpResponse
)

export {
  userTokenRefreshRouter,
  userTokenRefresh
}
