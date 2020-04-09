const apn = require("apn");

let provider = new apn.Provider({
  "cert": "public/BackOn.pem",
  "key": "public/BackOn.pem",
});
let notification = new apn.Notification();
notification.alert = "Hello, this is a test!";
notification.badge = 1337;

let token = "<7662f3ca693228b1a37cea14e7023a9573ecbd4dce48d0d7b6f0ba31d9e20dea>";

provider.send(notification, token).then( (response) => {
  console.log("done");
});