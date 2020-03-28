const mongoInterface = require('../mongoInterface');
const ObjectId = require('mongodb').ObjectId;

module.exports = (request, response) => {
  mongoInterface.Task.findByIdAndUpdate(request.body._id, { '$set': { helperID : ObjectId(request.body.helperID)} }).then(
    () => {
      response.send(200);
    }
  ).catch(
    (error) => {
      response.send(400);
    }
  );
};
