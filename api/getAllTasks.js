const mongoInterface = require('../mongoInterface');

module.exports = (request, response) => {
  mongoInterface.Task.aggregate([{
      $lookup: {
          from: "users", // collection name in db
          localField: "neederID",
          foreignField: "_id",
          as: "user"
      }
      }]).then(
      (tasks) => {
        res.status(200).json(tasks);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};