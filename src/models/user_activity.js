import 'base.js'
import mongoose from 'mongoose'
const activitySchema = mongoose.Schema
const refsVar = activitySchema.Types.ObjectId

const userActivitySchema = activitySchema({
  user_id: [{ type: refsVar, ref: 'User' }],
  ip: String,
  last_login: Date, default: Date.now(),
  user_agent: String
})

const UserActivity = mongoose.model('UserActivity', userActivitySchema)
module.exports = UserActivity