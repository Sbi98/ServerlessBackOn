const ObjectId = require('mongodb').ObjectId;
const mongoInterface = require('../mongoInterface');

module.exports = (request, response) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let dt = date_ob.getDate();
  let datini= new Date('2019-03-30T11:32:09.000+00:00');
  mongoInterface.Task.find({ date: { $lte: dt } })
  .then(
    (tasks) => {
      var stashedtasks=[];
      tasks.forEach(element => {
        //var elementDate = new Date(element["date"].toISOString());
        let stashedtask = new mongoInterface.StashedTask({
          _id: ObjectId(element["_id"]),
          title: element["title"],  
          description: element["description"],
          neederID: ObjectId(element["neederID"]),
          date: element["date"],
          latitude: element["latitude"],
          longitude: element["longitude"],
          helperID: ObjectId(element["helperID"]),
          report: null
        });
        stashedtasks.push(stashedtask);
        
      });

      
      mongoInterface.StashedTask.insertMany(stashedtasks).then(
        (res) => {
          response.status(200).json({res,"aaaa":"aaaaaaa"});
        }
      ).catch(
        (error) => {
          response.status(400).json({
            error: error
          });
        }
      );


      mongoInterface.Task.deleteMany(tasks).then(
        () => {
          
        }
      ).catch(
        (error) => {

        }
      );

    }
  )
  .catch(
    (error) => {
      response.status(400).json({
        error: error
      });
    }
  );
};

