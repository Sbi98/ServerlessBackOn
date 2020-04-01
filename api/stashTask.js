const ObjectId = require('mongodb').ObjectId;
const mongoInterface = require('../mongoInterface');

module.exports = (request, response) => {
  let helperID = request.body.helperID;
  if (helperID != null) {
    helperID = ObjectId(helperID);
  };
  const stashedtask = new mongoInterface.StashedTask({
    _id: ObjectId(request.body._id),
    title: request.body.title,  
    description: request.body.description,
    neederID: ObjectId(request.body.neederID),
    date: request.body.date,
    latitude: request.body.latitude,
    longitude: request.body.longitude,
    helperID: helperID,
    report: request.body.report
  });

  Task.deleteOne({_id: ObjectId(request.body._id)})
  .then(
    () => {
      console.log("Deleted task with id "+request.body._id);
    }
  )
  .catch(
    error => {
      console.error(error)
      res.send(400)
    }
  );

  stashedtask.save()
  .then(
    result => {
      console.log("Stashed task with id "+result._id);
      response.send(200)
    }
  )
  .catch(
    error => {
      console.error(error)
      response.send(400)
    }
  );
};

