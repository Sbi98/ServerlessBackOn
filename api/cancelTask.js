const mongoInterface = require('../mongoInterface');

module.exports = (request, response) => {
  mongoInterface.Task.findByIdAndUpdate(request.param("_id"), { '$set': { helperID : null } }).then(
    () => {
      response.send(200);
    }
  ).catch(
    (error) => {
      response.send(400);
    }
  );
};