import Router from 'express'

import tokenParser from '../../../main/middlewares/token-parser'

import signUpRoute from './signup-router'
import signInRoute from './singin-router'
import getRoute from './getuser-router'
import updateRoute from './update-router'
import tokenRoute from './token-router'

const userRoutes = Router()

userRoutes.post('/signup', signUpRoute)
userRoutes.post('/signin', signInRoute)
userRoutes.get('', tokenParser, getRoute)
userRoutes.put('', tokenParser, updateRoute)
userRoutes.post('/token', tokenRoute)

export default userRoutes