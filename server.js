'use strict'

var express = require('express');
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
var app = express();

//mongoose.connect(process.env.MONGO_URL || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/elist');
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function() {
  //console.log('connected to db');
//});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

require('./routes/routes')(app);

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 8222);
app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});
