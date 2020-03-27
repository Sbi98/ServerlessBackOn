const mongoInterface = require('../mongoInterface');
const ObjectId = require('mongodb').ObjectID;

module.exports = (request, response) => {
  mongoInterface.Task.deleteOne({_id: ObjectId(request.body._id)}).then(
    () => {
      response.send(200);
    }
  ).catch(
    (error) => {
      response.send(400);
    }
  );
};
