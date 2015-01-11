"use strict";

var express = require('express');

var app = express();

require('./routes/routes')(app);

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});
