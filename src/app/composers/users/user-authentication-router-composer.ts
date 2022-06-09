import UserAuthentication from "../../cases/users/user-authentication"
import UserAuthenticationRouter from "../../routers/users/user-authentication-router"

import { loadUserByEmailRepository, setUserParameterRepository } from "../../../infra/repositories/users"
import { encrypter, tokenGenerator } from "../../../utils/libraries"
import { requestBodyValidator } from "../../../utils/validators"
import httpResponse from '../../../utils/http/response/http-response'

const userAuthentication = new UserAuthentication(
  loadUserByEmailRepository, setUserParameterRepository, encrypter, tokenGenerator
)

const userAuthenticationRouter = new UserAuthenticationRouter(
  userAuthentication, requestBodyValidator, httpResponse
)

export {
  userAuthenticationRouter,
  userAuthentication
}
