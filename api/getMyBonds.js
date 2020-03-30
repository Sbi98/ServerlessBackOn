const mongoInterface = require('../mongoInterface');
const ObjectId = require('mongodb').ObjectId;

async function getRequests(id) {
  return mongoInterface.Task.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "helperID",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $match: {
        neederID: ObjectId(id)
      }
    }
  ])
}

async function getTasks(id) {
  return mongoInterface.Task.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "neederID",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $match: {
        helperID: ObjectId(id)
      }
    }
  ])
} 

module.exports = (request, response) => {
  let id = request.body._id;
  try {
    let [requests, tasks] = Promise.all([getRequests(id), getTasks(is)]);
    response.status(200).json({
      "tasks" : tasks,
      "requests" : requests
    });
  } catch (e) {
    console.error('error is', e);
    response.status(400).json({
      "error" : error
    });
  };
};