/*const mongoose = require('mongoose');

let cachedDb = null;

function connectToDatabase() {
  if (cachedDb != null) {
    console.log('Using cached database instance');
    return;
  }
  // If no connection is cached, create a new one
  const db = mongoose.connect('mongodb+srv://root:root@backon-nm2n7.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
  .then(() => {
    console.log('Successfully connected to BackOn MongoDB Atlas v2!');
  })
  .catch((error) => {
    console.log('Unable to connect to BackOn MongoDB Atlas v2!');
    console.error(error);
  });
  // Cache the database connection and return the connection
  cachedDb = db;
  console.log('Using new instance');
  return;
}

module.exports = connectToDatabase
*/

const mongoose = require('mongoose');
const uri = 'mongodb+srv://root:root@backon-nm2n7.mongodb.net/test?retryWrites=true&w=majority';
const uniqueValidator = require('mongoose-unique-validator');
const Double = require('@mongoosejs/double');
const ObjectId = require('mongodb').ObjectID;

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },  
  description: { type: String, required: false},
  neederID: { type: ObjectId, required: true},
  latitude: { type: Double, required: true},
  longitude: { type: Double, required: true},
  date: { type: Date, required: true},
  helperID: { type: ObjectId, required: false}
});
const userSchema = mongoose.Schema({
  name: { type: String, required: true},
  surname: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  photo: { type: String, required: true}
});
userSchema.plugin(uniqueValidator);

var connection = null

if (connection == null) {
  console.log("creating a new connection");
  connection = mongoose.createConnection(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
  connection.on("error", () => {
    console.log("> error occurred from the database");
  });
  connection.on("open", () => {
    console.log("> successfully opened the database");
  });
} else {
  console.log("using an existing connection");
}

var userModel = connection.model('User', userSchema);
var taskModel = connection.model('Task', taskSchema);

exports.User = userModel;
exports.Task = taskModel;