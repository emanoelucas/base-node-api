import Router from 'express'

import tokenParser from '../../../main/middlewares/token-parser'

import signUpRoute from './signup-router'
import signInRoute from './singin-router'
import getRoute from './getuser-router'
import updateRoute from './update-router'
import tokenRoute from './token-router'

const userRoutes = Router()

userRoutes.post('/signup', signUpRoute.sign)
userRoutes.post('/signin', signInRoute.sign)
userRoutes.get('', tokenParser, getRoute.get)
userRoutes.put('', tokenParser, updateRoute.update)
userRoutes.post('/token', tokenRoute.get)

export default userRoutes