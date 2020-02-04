import mongoose from 'mongoose'

var initDBConnection = async function() {
  const url = "mongodb://127.0.0.1:27017/testDB" //process.env.mongoUrl
  console.log(`---- ${url} -----`)
  await mongoose.connect(url, {'useCreateIndex': true })
  console.log('Database Created')
}
initDBConnection();

export default mongoose