import express from 'express'
import usersController from '../api/controllers/users_controller'
var usersRoute = express.Router()

usersRoute.post('/users/signup', usersController.signup)

usersRoute.get('/users/signin', usersController.signin)

usersRoute.get('/users/', usersController.index)

usersRoute.put('/users/:id/edit', usersController.edit)

usersRoute.delete('/users/:id/delete', usersController.deleteUser)

export default usersRoute
