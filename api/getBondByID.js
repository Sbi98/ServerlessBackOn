const mongoInterface = require('../mongoInterface');
const ObjectId = require('mongodb').ObjectId;

module.exports = (request, response) => {
  mongoInterface.Task.findOne({_id: ObjectId(request.body._id)}).then(
    (task) => {
      response.status(200).json(task);
    }
  ).catch(
    (error) => {
      response.status(404).json({
        error: error
      });
    }
  );
};
