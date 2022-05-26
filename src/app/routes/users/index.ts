import Router from 'express'

import signUpRoute from './signup-route'
import signInRoute from './singin-route'

const userRoutes = Router()

userRoutes.post('/signup', signUpRoute)
userRoutes.post('/signin', signInRoute)

export default userRoutes