const ObjectId = require('mongodb').ObjectId;
const mongoInterface = require('../mongoInterface');

module.exports = (request, response) => {
  mongoInterface.Task.aggregate([
    {
      $match: {
        neederID: ObjectId(id)
      }
    }
  ])
  .then(
    (tasks) => {
      tasks.forEach(element => {
        var elementDate = new Date(element["date"].toISOString());
        let stashedtask = new mongoInterface.StashedTask({
          _id: ObjectId(element["_id"]),
          title: element["title"],  
          description: element["description"],
          neederID: ObjectId(element["neederID"]),
          date: element["date"],
          latitude: element["latitude"],
          longitude: element["longitude"],
          helperID: ObjectId(element["helperID"]),
          report: null
        });
      });
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

