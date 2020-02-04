import mongoose from './base.js'
import bcrypt from 'bcrypt'
var SALT_FACTOR = 10

const initUser = async () => {
  const schema = mongoose.Schema
  // schema validations
  const userSchema = new schema( 
    { first_name: {
        type: String,
        validate: {
          validator: (text) => {
            return '/[AZaz]/'.test(text)
          },
          message: props => `${props.value} can only be characters.` 
        },
        required: [true, 'First name required']
      }, 
      last_name: {
        type: String,
        validate: {
          validator: (text) => {
            return '/[AZaz]/'.test(text)
          },
          message: props => `${props.value} can only be characters.` 
        }
      },
      email: {
        type: String,
        index: true,
        validate: {
          validator: (text) => {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text);
          },
          message: props => `${props.value} is an invalid email`
        },
        required: [true, 'Provide your email please!'],
        unique: true
      },
      password: {
        type: String,
        validate: {
          validator: (text) => {
            return /^[a-zA-Z0-9]{5,10}$/.test(text)
          },
          message: props => `${props.value} must be 5 to 10 characters long, atleast one uppercase, lowercase and digit.`
        },
        required: [true, 'Please provide a valid password.']
      },
      token: String,
      timestamps: true,
    }
  )
  // Password salting

  userSchema.pre('save', function(next){
    var user = this

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(error, salt){
      if(error) return next(error);

      bcrypt.hash(user.password, salt, function(error, hash){
        if(error) return next(error);
        user.password = hash;
        next();
      })
    })
  })

  // method to add before binding to model 
  userSchema.static.findbyemail = async function(emailText) {
    return await this.model.find({ email: emailText })
  }

  userSchema.methods.passwordMatch = function(userPassword, next){
    bcrypt.compare(userPassword, this.password, function(error, isMatch){
      if(error) return next(error);
      next(null, isMatch);
    });
  }

  const User = await mongoose.model('User', userSchema)
  module.exports = User;
}

initUser();