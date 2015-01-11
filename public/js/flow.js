$(document).ready(function() {
var elist = [];
  $.post('/', function(urlData){
    $('#temp').append('Temperature: ' + urlData.current_temps +'&deg;' +'F');
    $('#cond').append('Conditions: ' + urlData.conditions);
    $('#weather').append('<img src="'+urlData.outside+'">');
  });

$('#sub').click(function() {
    var txt = $('#signUp');
    elist.push(txt.body);
    console.log(elist);
    signUp = null;
  });
});
