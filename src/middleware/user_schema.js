import Joi from '@hapi/joi'

const UserSchema = {
  signUpSchema: Joi.object({
    first_name: Joi.string().regex(/[a-zA-Z]/).required(),
    last_name: Joi.string().regex(/[a-zA-Z]/),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).max(15).regex(/[a-zA-Z0-9]/).required()
  }),

  loginSchema: Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).max(15).regex(/[a-zA-Z0-9]/).required()
  })
  
}

export default  UserSchema
