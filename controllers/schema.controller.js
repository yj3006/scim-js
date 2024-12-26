//References
const fs = require('graceful-fs');
const config = require('../config.js');
var schemas = require('./schema.controller.js');
// let jwt = require('jsonwebtoken');

//Logs information.
var logger = require('../logging.js');

//basic-auth is used to validate basic authentication
var auth = require('basic-auth');

//This variable is used to generate the ID and externalId for a new user entry in
// the userdb.json file.
var sequenceNumber = 10;

//This function returns a list of all users for the target system.
//The list is in JSON format and contains the attribute "resources" with the
// value of an array of JSON objects representing each user and their attributes.
exports.findAll = function (req, res) {
  res.setHeader("content-type", "application/scim+json");
  logger.log('-----------------');
  logger.log('Entering users findAll function.');
  logger.log('Body:');
  logger.log(req.body);
  logger.log('Query:');
  logger.log(req.query); // Log the query parameters for debugging
  logger.log('----');

  // Check credentials
  if (users.authenticate(req, res)) {
    const userIDStore = JSON.parse(fs.readFileSync('./userdb.json', 'utf8'));
    let filteredUsers = userIDStore.resources;

    // Apply filters from query parameters
    if (req.query.filter) {
      const filter = decodeURIComponent(req.query.filter);

      // Example: Parsing `userName eq "value"`
      const match = filter.match(/(\w+)\s+eq\s+"(.+?)"/);
      if (match) {
        const field = match[1];
        const value = match[2];
        filteredUsers = filteredUsers.filter(user => user[field] === value);
      } else {
        logger.log('Invalid filter format');
        return res.status(400).json({ error: 'Invalid filter format' });
      }
    }

    logger.log('Found ' + filteredUsers.length + ' users.');
    res.status(200).json({ resources: filteredUsers });
  }
};
