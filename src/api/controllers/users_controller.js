import User from '../../models/user'
var userActions = (()=> {

  var signin = function(request, response){
    response.send('Signin Controller')
  }
  
  var index = function(request, response){
    response.send('Users Listing')
  }
  
  var signup = function(request, response){
    response.send('Signup Controller')
  }
  
  var edit = function(request, response){
    response.send('Update User')
  }
  
  var deleteUser = function(request, response){
    response.send('Delete User')
  }

  return{
    signin: signin,
    index: index,
    signup: signup,
    edit: edit,
    deleteUser: deleteUser
  }
})();


export default userActions