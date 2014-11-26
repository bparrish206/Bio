$(document).ready(function() {
  $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );

  $.post('/about', function(data){
    $('#show').append("Why I left: " + JSON.stringify(data.chart));
  });

  $.post('/', function(urlData){
    $('#temp').append('Temperature: ' + urlData.current_temps);
    $('#cond').append('Conditions: ' + urlData.conditions);
    $('#weather').append('<img src="'+urlData.outside+'">');
  });
});
