'use strict';
var elist = [];

$(document).ready(function() {
  $.post('/', function(urlData){
    $('#temp').append('Temperature: ' + urlData.current_temps +'&deg;' +'F');
    $('#cond').append('Conditions: ' + urlData.conditions);
    $('#weather').append('<img src="'+urlData.outside+'">');
  });

$('#sub').click(function() {
    var txt = $('input')[0].value;
    elist.push(txt);
    console.log(txt);
    $.ajax({
      type: 'GET',
      url:'/',
      data: {
        email: txt
      },
      success: function(data) {
        console.log(data);
        console.log("success")
      },
      dataType: 'json',
    });
  });
});
