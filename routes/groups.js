//Oracle Corporation

module.exports = function(app){

  var groups = require('../controllers/group.controller.js');

  //Get operation for /Groups endpoint
  app.get('/scim/Groups', groups.findAll);

  //Get operation for /Groups endpoint
  app.get('/scim/Groups/:id', groups.findOne);

  //Post operation for /Groups endpoint
  app.post('/scim/Groups', groups.create);

  //Put and Patch operation for /Groups endpoint
  app.put('/scim/Groups/:id', groups.update);
  app.patch('/scim/Groups/:id', groups.update);

  //Delete operation for /Groups endpoint
  app.delete('/scim/Groups/:id', groups.delete);

}
