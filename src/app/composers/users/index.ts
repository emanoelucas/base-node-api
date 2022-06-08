import Router from 'express'

import tokenParser from '../../../main/middlewares/token-parser'

import createUserRouter from './create-user-router-composer'
import getUserRouter from './get-user-router-composer'
import updateUserRouter from './update-user-router-composer'
import userAuthenticationRouter from './user-authentication-router-composer'
import userTokenRefreshRouter from './user-token-refresh-router-composer'


const userRoutes = Router()

userRoutes.post('/signup', createUserRouter.sign)
userRoutes.post('/signin', userAuthenticationRouter.sign)
userRoutes.get('', tokenParser, getUserRouter.get)
userRoutes.put('', tokenParser, updateUserRouter.update)
userRoutes.post('/token', userTokenRefreshRouter.get)

export default userRoutes