import Router from 'express'

import tokenParser from '../../../main/middlewares/token-parser'

import signUpRoute from './signup-route'
import signInRoute from './singin-route'
import getRoute from './getuser-route'
import updateRoute from './update-route'
import tokenRoute from './token-route'

const userRoutes = Router()

userRoutes.post('/signup', signUpRoute)
userRoutes.post('/signin', signInRoute)
userRoutes.get('', tokenParser, getRoute)
userRoutes.put('', tokenParser, updateRoute)
userRoutes.post('/token', tokenRoute)

export default userRoutes