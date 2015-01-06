'use strict';

var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect(process.env.MONGO_URL|| 'mongodb://localhost/elist');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db');
});

require('./routes/routes')(app);

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});
