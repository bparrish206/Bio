'use strict';

$(document).ready(function() {
  $.post('/', function(urlData){
    $('#temp').append('Temperature: ' + urlData.current_temps +'&deg;' +'F');
    $('#cond').append('Conditions: ' + urlData.conditions);
    $('#weather').append('<img src="'+urlData.outside+'">');
  });

$('#sub').click(function() {
    var elist = [];
    var txt = $('input')[0].value;
    elist.push(txt);
    console.log(elist[0]);
    return elist;
  });
});
