const mongoInterface = require('../mongoInterface');
const ObjectId = require('mongodb').ObjectId;

module.exports = (request, response) => {
  const task = new mongoInterface.Task({
    title: request.body.title,  
    description: request.body.description,
    neederID: ObjectId(request.body.neederID),
    date: request.body.date,
    latitude: request.body.latitude,
    longitude: request.body.longitude,
    helperID: null
  });

  task.save().then((result) => {
    console.log("creation\n"+result._id);
    response.status(200).json({
      _id: result._id
    });
}).catch(
    (error) => {
      response.status(400).json({
        error: error
      });
    }
  );
};
