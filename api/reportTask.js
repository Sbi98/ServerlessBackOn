const mongoInterface = require('../mongoInterface');
const ObjectId = require('mongodb').ObjectId;

module.exports = (request, response) => {
  let id = request.body._id;
  let report = request.body.report
  let toReport = request.body.toReport
  if (id == null) {
    console.error("_id or helperID field not found in request");
    response.status(400).json({
      "error" : "_id or helperID field not found in request"
    });
    console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    return;
  }
  if(toReport == "helper") {
    mongoInterface.Task.findByIdAndUpdate(id, { '$set': { helperReport : toReport} }).then(
        () => {
          response.send(200);
        }
      ).catch(
        (error) => {
          response.send(400);
        }
      );
  }
  else {
    mongoInterface.Task.findByIdAndUpdate(id, { '$set': { neederReport : toReport} }).then(
        () => {
          response.send(200);
        }
      ).catch(
        (error) => {
          response.send(400);
        }
      );
  }
  
};
