const mongoInterface = require('../mongoInterface');

module.exports = (request, response) => {
  var user = new mongoInterface.User({
    name: request.body.name,
    surname: request.body.surname,
    email: request.body.email,
    photo: request.body.photo
  });

  if (user!=null)
    mongoInterface.User.findOne({email : user.email}).then(
      (existentuser) => {
        if (existentuser!=null) {
          console.log("User alredy exists: "+existentuser)
          response.status(200).json({_id: existentuser._id});
          user=null;
        } else {
          console.log("Registering "+user);
          mongoInterface.User.save()
          .then(result => {
            console.log("Registered \n"+result);
            response.status(200).json({
              _id: result._id
            });
          })
          .catch(err => {
            console.log(err);
          });
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
};