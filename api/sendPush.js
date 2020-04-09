const apn = require("apn")

module.exports = (request, response) => {
   let provider = new apn.Provider({
      cert: "public/BackOn.pem",
      key: "public/BackOn.pem",
      production: false
   });

   let deviceTokens = ["7662f3ca693228b1a37cea14e7023a9573ecbd4dce48d0d7b6f0ba31d9e20dea"];

   var notification = new apn.Notification();
   notification.alert = "Don't worry, be happy";
   notification.badge = 1;
   notification.topic = "it.unisa.applefoundationprogram.BackOn";

   provider.send(notification, deviceTokens).then( (res) => {
      console.log('ao');
      response.status(200).json(res);
   });
}
