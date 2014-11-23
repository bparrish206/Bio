'use strict';

var Elist = require('..models.elist');

module.exports = function(app){
  app.post('/', function(req, res){
  var name = req.body.name;
  var email = req.body.email;
  });

Elist.findOne({email: email}, function(err, user){
  if(err) return res.status(404).send('server error');
  if(!user) {
    var newMem = new Elist(req.body);
    newMem.name = req.body.name;
    newMem.email = req.body.email;
    newMem.save(function(err){
    res.send(newMem.email "Thank you" + newMem.name + "for signing up for my email");
  });
});
    }
});
