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
  console.log('eseguo la prima');
  let execGetReq = getRequests(request.body._id);
  console.log('eseguo la seconda');
  let execGetTask = getTasks(request.body._id);
  try {
    let requests = await execGetReq;
    console.log('finito la prima');
    let tasks = await execGetTask;
    console.log('finito la seconda');
    response.status(200).json({
      "tasks" : tasks,
      "requests" : requests
    });
  } catch(e) {
    console.log(e);
    response.status(400).json({
      "error" : error
    });
  };
};