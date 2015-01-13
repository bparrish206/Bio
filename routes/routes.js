'use strict';

var request = require('superagent');
var Elist = require('../models/elist');
var nodemailer = require('nodemailer');
var list = ['brentparrish76@gmail.com'];
var ct = 0;

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'brentparrish76@gmail.com',
    pass: process.env.PASSWRD
  }
});

var mailOptions = {
  from: 'Brent Parrish <brentparrish76@gmail.com>',
  to: list[ct],
  subject: 'Thank You!',
  text: 'Thank you for signing up for my email list.',
  html: '<p>Thank you for signing up for my email list.</p>'
};

module.exports = function(app){

  app.get('/', function(req, res, next) {
    var email = new Elist({email: req.query.email});
    email.save(function(err) {
      if(err) return res.status(500).send('server error');
      console.log(email);
      list.push(email.email);
      ct++;
      console.log(list);
      transporter.sendMail(mailOptions, function(error, info) {
        if(error) console.log(error);
        else console.log("Message sent: " + info.response);
      });
      res.json(email);
      return email;
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
    res.json({chart: title, date: rdate, choice: choice, value: value});
  });
});

};
