$(document).ready(function() {

  $.post('/', function(urlData){
    $('#temp').append('Temperature: ' + urlData.current_temps +'&deg;' +'F');   
    $('#cond').append('Conditions: ' + urlData.conditions);
    $('#weather').append('<img src="'+urlData.outside+'">');
  });
});
