'use strict';

var request = require('superagent');
var Elist = require('../models/elist');
var nodemailer = require('nodemailer');
var _ = require("underscore");

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'brentparrish76@gmail.com',
    pass: process.env.PASSWRD
  }
});

module.exports = function(app){

  app.get('/', function(req, res, next) {
    var email = new Elist({email: req.query.email});
    email.save(function(err) {
      if(err) return res.status(500).send('server error');
      var mailOptions = {
        from: 'Brent Parrish <brentparrish76@gmail.com>',
        to: email.email,
        bcc: 'brentparrish76@gmail.com',
        subject: 'Thank You!',
        text: 'Thank you for signing up for my email list.  I send out semiregular updates and tips.  This is email is also the best way to contact me, so feel free to reach out.',
        html: '<body style="background-color:#b0c4de"><h3 style="color:white;text-shadow: 1px 1px #001F3F; padding:10px;">Thank you for signing up for my email list.  I send out semiregular updates and tips.  This email is also the best way to contact me, so feel free to reach out.</h3> <p>Brent Parrish</p> <p>bparrish.com</p><p><a href="https://github.com/bparrish206">github.com/bparrish206</a></p><img src="https://unsplash.com/photos/7RIm0GqvvkM/download" style="width:225px;height:110px"/></body>'
      };
      console.log(email);
      transporter.sendMail(mailOptions, function(error, info) {
        if(error) console.log(error);
        else console.log("Message sent: " + info.response);
      });
    });
    next();
    });

  app.post('/', function(req, res){
  var url = "http://api.wunderground.com/api/" + '828e3a84bb61c1a2' + "/geolookup/conditions/q/" + 'WA/Seattle'+ ".json";
  request
    .get(url)
    .end(function (err, urlData){
      var parsedBody = JSON.parse(urlData.text);
      if(err) throw err;
      var cond = parsedBody.current_observation.weather;
      var icon = parsedBody.current_observation.icon_url;
      var temp = parsedBody.current_observation.temp_f;

    res.send({location: "Seattle", current_temps: temp, conditions: cond, outside:icon });
  });
});

app.post('/about', function(req, res){
  var purl = 'http://elections.huffingtonpost.com/pollster/api/charts/obama-job-approval';
  request
    .get(purl)
    .end(function (err, purlData){
      if(err) throw err;
      var title = purlData.body.title;
      var est = purlData.body.estimates;
      var choice = est[1].choice;
      var value = est[1].value;
      var date = purlData.body.last_updated;
      var rdate = date.slice(0,10);
      var test = _.pick(purlData.body, 'estimates_by_date');
      var test1 = _.values(test);
      var test2 = test1[0];
    res.json({chart: title, date: rdate, choice: choice, value: value, test2: test2});
  });
});

};
