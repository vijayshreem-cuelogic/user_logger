import mongoose from 'mongoose'

var initDBConnection = async function() {
  const url = process.env.mongoUrl
  console.log(`---- ${url} -----`)
  await mongoose.connect(url, {'useCreateIndex': true })
  .then(console.log('Database Created'))
  .catch((e) => console.log(`Error ${e}`))
  
}
initDBConnection();

export default mongoose