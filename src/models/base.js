import 'dotenv/config'
import mongoose from 'mongoose';

var initDBConnection = async function() {
  const url = process.env.mongoUrl
  console.log(`---- ${url} -----`)
  await mongoose.connect(url)
  console.log('Database Created')
}
initDBConnection();

export default mongoose