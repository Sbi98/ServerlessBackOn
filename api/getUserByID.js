const mongoInterface = require('../mongoInterface');

module.exports = (request, response) => {
  var ObjectId = require('mongodb').ObjectID;
  mongoInterface.User.findOne({_id: ObjectId(request.body._id)}).then(
    (user) => {
      response.status(200).json(user);
    }
  ).catch(
    (error) => {
      response.status(400).json({
        error: error
      });
    }
  );
};