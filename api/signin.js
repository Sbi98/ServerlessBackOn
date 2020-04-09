const mongoInterface = require('../mongoInterface');
const ObjectId = require('mongodb').ObjectId;

module.exports = (request, response) => {
  var user = new mongoInterface.User({
    name: request.body.name,
    surname: request.body.surname,
    email: request.body.email,
    photo: request.body.photo,
    devices: new Map()
  });
  user.devices.set( request.body.deviceToken , Date.now() ); 
  var dev = 'devices.'.concat(request.body.deviceToken);
  var dt = Date.now()
  if (user != null){
    mongoInterface.User.findOneAndUpdate({
      email: ObjectId(request.body.email)
    }, {$set: { dev : dt}} 
    , { upsert: true }
    , function(err, res) {
      // Deal with the response data/error
    });
  }
    /*mongoInterface.User.findOne({email : user.email})
    .then(
      (existentuser) => {
        if (existentuser != null) {
          console.log(existentuser+" already exists");
          var gdevices = existentuser.devices;
          gdevices.set( request.body.deviceToken , Date.now() );
          mongoInterface.User.updateOne({_id : ObjectId(existentuser._id)}, {$set: {'devices' : gdevices}});

          response.status(200).json({_id: existentuser._id});
          
          user = null;
        } else {
          console.log("Registering "+user);
          user.save()
          .then(
            result => {
              console.log("Registered user: "+result);
              response.status(200).json({
                _id: result._id
              });
            }
          )
          .catch(err => {
            console.error(err);
            response.status(400).json({
              "error": err
            });
          });
        }
      }
    )
    .catch(
      (error) => {
        console.error(error);
        response.status(400).json({
          "error": err
        });
      }
    );
    */
  else {
    console.error("Error while creating User. Maybe there are missing fields in the request");
    response.status(400).json({
      "error": "Error while creating User. Maybe there are missing fields in the request"
    });
  }
};