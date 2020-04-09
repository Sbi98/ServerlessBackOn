const mongoInterface = require('../mongoInterface');

module.exports = (request, response) => {
  var user = new mongoInterface.User({
    _id: "mammamiachebellid",
    name: "Gian",
    surname: "Sorr",
    email: "mail@mmail.mail",
    photo: "URL",
    devices: ["primotoken", "secondoToken"]
  });
  user.save();
}
