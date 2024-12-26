module.exports = function(app) {

  var schemas = require('../controllers/schema.controller.js');

  app.get('/scimgate/Schemas', schemas.findAll);
  
}
