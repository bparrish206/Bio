"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var nodemailer = require('nodemailer');



mongoose.connect(process.env.MONGO_URL|| 'mongodb://localhost/elist');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'brentparrish76@gmail.com',
    pass: process.env.PASSWRD
  }
});

var mailOptions = {
  from: 'Brent Parrish <brentparrish76@gmail.com>',
  to: "",
  subject: 'Thank You!',
  text: 'Thank you for signing up for my email list.',
  html: '<p>Thank you for signing up for my email list.</p>'
};

transporter.sendMail(mailOptions, function(error, info) {
  if(error) console.log(error);
  else console.log("Message sent: " + info.response);
});

require('./routes/routes')(app);

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});
