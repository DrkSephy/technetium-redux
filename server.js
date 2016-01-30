var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Create the Express Application
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/hello')(app);

app.listen(app.get('port'), () => 
	console.log('Express server listening on port ' + app.get('port')));

module.exports = app;