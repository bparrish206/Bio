$(document).ready(function() {
  $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
  $.post('/about/', function(data){
    $('#show').append("Why I left: " + JSON.stringify(data.chart));
  });



 function showLocation(position) {
var latitude = position.coords.latitude;
var longitude = position.coords.longitude;

 $.ajax({
        url: '/',
        type: 'POST',
        urlData: {lat:latitude, lon: longitude},
        success: function(urlData) {
            $('#temp').append('Temperature: ' + urlData.current_temps);
            $('#cond').append('Conditions: ' + urlData.conditions);
            $('#weather').append('<img src="'+urlData.outside+'">');
        }
      });
}

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, function(err) {
      if (err) {
        $('#weather')
        .html('<p>You Must Allow Access to Your Location to Find Out.</p>');
      }
    });
  } else {
    $('#weather').html('<p>Unable to Locate You.</p>bv');
  }
}());
