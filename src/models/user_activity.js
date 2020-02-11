import mongoose from './base.js'

const activitySchema = mongoose.Schema

const userActivitySchema = new activitySchema({
  user_id: { type: mongoose.Schema.ObjectId, ref: 'User'},
  ip: String,
  last_login: { type: Date, default: Date.now },
  user_agent: String
},
{ timestamps: true }
)

const UserActivity = mongoose.model('UserActivity', userActivitySchema);
export default UserActivity

