import express from 'express'
import usersController from '../api/controllers/users_controller'
import authToken from '../middleware/auth_token'

var usersRoute = express.Router({mergeParams: true})

usersRoute.post('/users/signup', usersController.signup)

usersRoute.post('/users/signin', usersController.signin)

usersRoute.get('/users/', authToken, usersController.index)

usersRoute.put('/users/:id/edit', authToken, usersController.edit)

usersRoute.delete('/users/:id/delete', authToken, usersController.deleteUser)

usersRoute.get('/users/:id/profile', authToken, usersController.profile)

usersRoute.get('/users/getInactiveUsers', authToken, usersController.getInactiveUsers)

export default usersRoute
