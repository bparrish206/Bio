$(document).ready(function(){
  $( "#tabs" ).tabs({
    event: "mouseover"
  });

  $.post('/about', function(data){
    $('#tabs-4').append('<h4>' + data.chart + " " + data.date + " " + data.choice + " " + data.value + '%'+ '</h4>');
  });
});
