const mongoInterface = require('../mongoInterface');

module.exports = async (request, response) => {
  var me = request.body._id;
  let requests = () => ( mongoInterface.Task.find({helperID: null, neederID: {$ne : me} }).exec() );
  var discovered_requests;
  var userMap = new Map();
  try {
    discovered_requests = await requests();
    for(var taskcounter in discovered_requests) {
        let user = () => ( mongoInterface.User.findOne({_id : discovered_requests[taskcounter].neederID}).exec() );
        try {
          var usr = await user();
          userMap.set(usr._id.toString(), usr)
        } catch(errini) { console.log("NESTED ERROR PROMISE:"+errini) }
    }
  }catch(e) { console.log(e) }

  response.status(200).json({
    "tasks" : discovered_requests,
    "users" : Array.from(userMap.values())
  });
};
