require('dotenv').config()
import express from 'express'
console.log(`======== ${process.env.mongoUrl} =======`)
import mongoose from './src/models/base'
import usersRoute from './src/routers/users'
var app = express();

var router = express.Router();

router.get('/', function(request, response){
  response.send('Welcome to express')
})

app.use('/api', usersRoute)
app.use('/api', router)
app.listen('3000', (err, response)=>{
  if(err) throw err;
  console.log('Server started')
})