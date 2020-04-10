const mongoInterface = require('../mongoInterface');

module.exports = (request, response) => {
  var user = new mongoInterface.User({
    _id: ObjectID.createFromHexString("7662f3ca693228b1a37cea14e7023a9573ecbd4dce48d0d7b6f0ba31d9e20dea"),
    name: "Gian",
    surname: "Sorr",
    email: "mail@mmail.mail",
    photo: "URL",
    devices: []
  });
  user.save();
}
