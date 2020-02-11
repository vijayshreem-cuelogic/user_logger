import express from 'express'
import usersController from '../api/controllers/users_controller'
import authToken from '../middleware/auth_token'
import Schema from '../middleware/user_schema'
import JoiValidator from '../middleware/joi_validate'

var usersRoute = express.Router({mergeParams: true})

usersRoute.post('/users/signup', JoiValidator(Schema.signUpSchema), usersController.signup)

usersRoute.post('/users/signin', JoiValidator(Schema.loginSchema), usersController.signin)

usersRoute.get('/users/', authToken, usersController.index)

usersRoute.put('/users/:id/edit', [JoiValidator(Schema.signUpSchema), authToken], usersController.edit)

usersRoute.delete('/users/:id/delete', authToken, usersController.deleteUser)

usersRoute.get('/users/:id/profile', authToken, usersController.profile)

usersRoute.get('/users/getInactiveUsers', authToken, usersController.getInactiveUsers)

export default usersRoute
