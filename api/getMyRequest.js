const mongoInterface = require('../mongoInterface');

module.exports = (request, response) => {
  mongoInterface.Task.aggregate([
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
          neederID: request.body.neederID
      }
    }
    ])
    .then(
    (tasks) => {
      response.status(200).json(tasks);
    }
    )
    .catch(
      (error) => {
        response.status(400).json({
          error: error
        });
      }
    );
};