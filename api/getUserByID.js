const mongoInterface = require('../mongoInterface');
const ObjectId = require('mongodb').ObjectId;

module.exports = (request, response) => {
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