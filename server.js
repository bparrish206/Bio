"use strict";

var express = require('express');
var app = express();
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'brentparrish76@gmail.com',
    pass: '######'
  }
});

//console.log(elist);

var mailOptions = {
  from: 'Brent Parrish <brentparrish76@gmail.com>',
  to: "brentparrish76@gmail.com",
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
