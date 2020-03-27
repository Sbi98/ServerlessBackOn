const mongoInterface = require('../mongoInterface');
const ObjectId = require('mongodb').ObjectID;

module.exports = (request, response) => {
  mongoInterface.Task.findByIdAndUpdate(request.param("_id"), { '$set': { helperID : ObjectId(request.param("helperID"))} }).then(
    () => {
      response.send(200);
    }
  ).catch(
    (error) => {
      response.send(400);
    }
  );
};
