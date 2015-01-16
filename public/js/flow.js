'use strict';

$(document).ready(function() {
  $.post('/', function(urlData){
    $('#temp').append('Temperature: ' + urlData.current_temps +'&deg;' +'F');
    $('#cond').append('Conditions: ' + urlData.conditions);
    $('#weather').append('<img src="'+urlData.outside+'">');
  });

$('#sub').click(function() {
    var txt = $('input')[0].value;
    $.ajax({
      type: 'GET',
      url:'/',
      data: {
        email: txt
      },
      success: function(data) {
      },
      dataType: 'json',
    });
    $('input').val('');
  });
});
