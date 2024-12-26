//References
const fs = require('graceful-fs');
const config = require('../config.js');
var users = require('./user.controller.js');
var schemas = require('./schema.controller.js');
// let jwt = require('jsonwebtoken');

//Logs information.
var logger = require('../logging.js');

//basic-auth is used to validate basic authentication
var auth = require('basic-auth');

const coreUserSchema = {
  id: "urn:ietf:params:scim:schemas:core:2.0:User",
  name: "User",
  description: "Core User schema",
  attributes: [
  ]
};


//This function returns the schema for the target system.
exports.findAll = function (req, res) {
  res.setHeader("content-type", "application/scim+json");
  logger.log('-----------------');
  logger.log('Entering schema findAll function.');
  logger.log('Body:');
  logger.log(req.body);
  logger.log('Query:');
  logger.log(req.query); // Log the query parameters for debugging
  logger.log('----');

  
  // Check credentials
  if (users.authenticate(req, res)) {
    const schemaExtension = JSON.parse(fs.readFileSync('./schemas/starsuite-user-extension-schema.json', 'utf8'));

    res.status(200).json([coreUserSchema, schemaExtension]);
  }
};
