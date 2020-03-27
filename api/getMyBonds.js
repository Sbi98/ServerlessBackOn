const mongoInterface = require('../mongoInterface');

module.exports = async (request, response) => {
  if(request.body.neederID){
    let requests = () => ( mongoInterface.Task.find({neederID : request.body.neederID}).exec() );
    var myrequests;
    let userMap = new Map();
    try {
      myrequests = await requests();
      console.log("AAAAAIIII"+myrequests);

      for(var taskcounter in myrequests) {
        if (myrequests[taskcounter].helperID==null) continue;
        let user = () => ( mongoInterface.User.findOne({_id : myrequests[taskcounter].helperID}).exec() );
        
        try{
          var usr = await user();
          userMap.set(usr._id.toString(), usr)
        }catch(errini) { console.log("NESTED ERROR PROMISE:"+errini) }

      }
    }catch(e) { console.log(e) }

    console.log({
      "tasks" : myrequests,
      "users" : Array.from(userMap.values())
    });
    response.status(200).json({
      "tasks" : myrequests,
      "users" : Array.from(userMap.values())
    });
  } else if(request.body.helperID){
    let tasks = () => ( mongoInterface.Task.find({helperID : request.body.helperID}).exec() );
    var mytasks;
    let userMap = new Map();
    try {
      mytasks = await tasks();
      console.log("AAAAAIIII"+mytasks);

      for(var taskcounter in mytasks) {
        let user = () => ( mongoInterface.User.findOne({_id : mytasks[taskcounter].neederID}).exec() );
        
        try{
          var usr = await user();
          userMap.set(usr._id.toString(), usr)
        }catch(errini) { console.log("NESTED ERROR PROMISE:"+errini) }

      }
    }catch(e) { console.log(e) }

    console.log({
      "tasks" : mytasks,
      "users" : Array.from(userMap.values())
    });
    response.status(200).json({
      "tasks" : mytasks,
      "users" : Array.from(userMap.values())
    });
  } else {
    response.status(400).json({
      error: "ehm"
    });
  }
  
};

