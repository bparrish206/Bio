'use strict';

var request = require('superagent');

module.exports = function(app){

  app.post('/', function(req, res){
  var url = "http://api.wunderground.com/api/" + process.env.APIKEY + "/geolookup/conditions/q/" + 'WA/Seattle'+ ".json";
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
