const mongoInterface = require('../mongoInterface');

module.exports = (request, response) => {
  mongoInterface.Task.aggregate([
    {
      $lookup: {
          from: "users", // collection name in db
          localField: "helperID",
          foreignField: "_id",
          as: "user"
      }
    },
    {
        $match: {
            helperID: request.body.helperID
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