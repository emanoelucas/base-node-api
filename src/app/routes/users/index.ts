import Router from 'express'

import tokenParser from '../../../main/middlewares/token-parser'

import signUpRoute from './signup-route'
import signInRoute from './singin-route'
import getRoute from './get-route'

const userRoutes = Router()

userRoutes.post('/signup', signUpRoute)
userRoutes.post('/signin', signInRoute)
userRoutes.get('/:id', tokenParser, getRoute)

export default userRoutes