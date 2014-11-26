$(document).ready(function(){
  $( "#tabs" ).tabs({
    event: "mouseover"
  });

  $.post('/about', function(data){
    $('#tabs-4').append("Why I left?  From the Huffington Post: " + data.chart + " " + data.date + " " + data.choice + " " + data.value);
  });
});
