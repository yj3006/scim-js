//Oracle Corporation

module.exports = function(app) {

  var users = require('../controllers/user.controller.js');

  //Get operation for /Users endpoint
  app.get('/scim/Users', users.findAll);

  //Get operation for /Users endpoint
  app.get('/scim/Users/:id', users.findOne);

  //Post operation for /Users endpoint
  app.post('/scim/Users', users.create);

  //Put and Patch operation for /Users endpoint
  app.put('/scim/Users/:id', users.update);
  app.patch('/scim/Users/:id', users.update);

  //Delete operation for /Users endpoint
  app.delete('/scim/Users/:id', users.delete);

  
  app.get('/scim/', users.test);
}
