import 'dotenv/config'
import express from 'express'
import bodyparser from 'body-parser'
import mongoose from './src/models/base'
import usersRoute from './src/routers/users'
var app = express();

app.use(bodyparser.urlencoded({extended: true}))
app.use('/api', usersRoute)

app.listen(process.env.PORT, (err, response)=>{
  if(err) throw err;
  console.log('Server started')
  console.log(` PORT ${process.env.PORT}`)
})