import User from '../../models/user'
import UserActivity from '../../models/user_activity'
import jwt from 'jsonwebtoken'
var userActions = (()=> {

  var signin = async function(request, response){
    const { email, password } = request.body
    await User.findByEmail(email)
    .then(async (user) => { 
      if(user.passwordMatch(password))
      { 
        const payload = { user: user.email};
        const options = { expiresIn: '2d', issuer: 'test.com' };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, options);

        // console.log('TOKEN', token);
        const activity = 
        { 
          ip: request.ip ,
          user_agent: request.headers['user-agent'],
          user_id: user._id
        }

        var user_activity = new UserActivity(activity)
        await user_activity.save().then(response.status(200).send({token: token}) )
      }
      else
      { 
        response.status(500).send('Invalid Email or password') 
      } 
    })
    .catch((error) => { 
      response.status(500).send('User does not exist')
      console.log(error)
    })
  }
  
  var index = async function(request, response){
    await User.find({})
    .then((users) => { response.status(200).send(`${JSON.stringify(users)}`) })
    .catch((error)=> { response.status(500).send(error) })
  }
  
  var signup = async function(request, response){
    try
    {
      const { email, password, first_name, last_name } = request.body;
      const existingUser = await User.findByEmail(email);
      if(existingUser) 
      {
        return response.status(409).send(`Error: ${email} specified email already Exist`)
      }
      const newUser = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
      }
      var user = new User(newUser)
      await user.save()
              .then(function(validUser){
                response.send(`Created user ${JSON.stringify(validUser)}`)
              }).catch(function(err){
                response.status(500).send(`Some error has been occured ${err}`)
              })
    }
    catch(error){
      console.log(`error ${error}`)
      response.status(500).send(error)
    }
  }
  
  var edit = async function(request, response){
    try{
      console.log(request.body)
      var id = request.params.id
      const { email, password, first_name, last_name } = request.body;
      const updatedUser = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
      }
      await User.updateUser(id, updatedUser)
      .then((user)=>{
        if(user)
          {response.status(200).send(`Updated user ${JSON.stringify(user)}`)}
        else
        { response.status(500).send(`User not found`)}
      })
      .catch((error) => {
        response.status(500).send(`Some error has been occured ${error}`)
      })
    }
    catch(error){
      console.log(`error ${error}`)
      response.status(500).send(error)
    }
  }
  
  var deleteUser = async function(request, response){
    var id = request.params.id
    await User.removeUser(id)
    .then(() => { response.status(200).send('User deleted successfully') })
    .catch((error) => { response.status(500).send(error) })
  }

  var profile = async function(request, response){
    var id = request.params.id
    await User.findById(id)
    .then((user) => { response.status(200).send(user) })
    .catch((error)=>{ `Some error has been occured ${error}` })
  }

  var getInactiveUsers = async function(request, response){
    try{
      var activity = await UserActivity.find({})
                      .sort({createdAt: 1})
                      .limit(parseInt(process.env.inactiveDays))
                      .populate('user')
                      console.log(parseInt(process.env.inactiveDays))
      response.status(200).send(JSON.stringify(activity))
    }
    catch(error)
    {
      response.status(500).send(error)
    }
  }

  return{
    signin: signin,
    index: index,
    signup: signup,
    edit: edit,
    deleteUser: deleteUser,
    profile: profile,
    getInactiveUsers: getInactiveUsers
  }
})();


export default userActions