const mongoInterface = require('../mongoInterface');

module.exports = (request, response) => {
  mongoInterface.Task.find().then(
    (tasks) => {
      response.status(200).json(tasks);
    }
  ).catch(
    (error) => {
      response.status(400).json({
        error: error
      });
    }
  );
};