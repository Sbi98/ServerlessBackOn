const mongoInterface = require('../mongoInterface');
const ObjectId = require('mongodb').ObjectId;

module.exports = (request, response) => {
  mongoInterface.Task.aggregate([
      {
        $lookup: {
            from: "users", // collection name in db
            localField: "neederID",
            foreignField: "_id",
            as: "user"
        }
      },
      {
        $match: {
            helperID: null, neederID: {$ne : ObjectId(request.body._id)}
        }
      }
    ]).then(
      (tasks) => {
        response.status(200).json(tasks);
      }
    ).catch(
      (error) => {
        response.status(400).json({
          error: error
        });
      }
    );
};