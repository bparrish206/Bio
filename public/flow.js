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

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, function(err) {
      if (err) {
        $('#space')
        .html('<p>You Must Allow Access to Your Location to Find Out.</p>');
      }
    });
  } else {
    $('#space').html('<p>Unable to Locate You.</p>bv');
  }
}());
