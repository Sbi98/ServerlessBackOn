var apns = require("apns"), options, connection, notification;

options = {
   "cert": "public/BackOn.pem",
  "key": "public/BackOn.pem",
   debug : true
};

connection = new apns.Connection(options);

notification = new apns.Notification();
notification.device = new apns.Device("7662f3ca693228b1a37cea14e7023a9573ecbd4dce48d0d7b6f0ba31d9e20dea");
notification.alert = "Hello World !";

connection.sendNotification(notification);
