//Oracle Corporation
//This application doesn't implement SSL. Oracle recommends that the SCIM Gateway
//for your application uses HTTP(s).
//Don't deploy this application to production.
process.env.ADMINUSER = 'ADMIN'
process.env.ADMINPASS = 'PASS'
process.env.PORT = 8080
process.env.MODE='bearer'
process.env.BEARER_TOKEN='randomtokenfortesting123456789'
if ( (!process.env.ADMINUSER) ||
     (!process.env.ADMINPASS) ||
	   (!process.env.PORT)) {
       console.error();
       console.error("ERROR!");
       console.error();
       console.error( "This app requires ADMINUSER, ADMINPASS, and PORT be set in the environment.");
       console.error( "HINT: If you're starting this from the command line use the run.sh or run.bat script.");
       console.error();
       process.exit(1);
}

// Import packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/scim+json' }));
var config = require('./config.js');

//Routes to Users endpoint
require('./routes/users.js')(app);
require('./routes/groups.js')(app);

// Set Port
app.set('port', (process.env.PORT || config.APP_DEFAULT_PORT));
app.listen(app.get('port'), function(){
	console.log('Server started on port '+ app.get('port'));
});
