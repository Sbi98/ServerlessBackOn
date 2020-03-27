const mongoInterface = require('../mongoInterface');

module.exports = (request, response) => {
  console.log(request.body.email);

  var user = new User({
    name: request.body.name,
    surname: request.body.surname,
    email: request.body.email,
    photo: request.body.photo
  });

  mongoInterface.User.findOne({email : mongoInterface.User.email}).then(
    (existentuser) => {
      if(existentuser!=null) {
        console.log("User alredy exists: "+existentuser)
        response.status(200).json({_id: existentmongoInterface.User._id});
        user=null;
      } else {
        console.log("signup\n"+request.body.email+"\n   aaa  \n"+user);
        if(user!=null) mongoInterface.User.save().then(result => {
                console.log("signup\n"+result);
                //document saved
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
    }
  );
};