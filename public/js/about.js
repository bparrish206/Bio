
$(document).ready(function(){
  $( "#tabs" ).tabs({
    event: "click"
  });
  $('#chart_div').hide();

  $.post('/about', function(data){
    google.load("visualization", "1", {packages:["corechart"], "callback":drawChart });
    google.setOnLoadCallback(drawChart);

    $('#tabs-4').append('<h4>' + data.chart + " " + data.date + " " + data.choice + " " + data.value + '%'+ '</h4>', '<br>', '<button id=Chart>' + 'Show Chart' + '</button>');
    //$('#tabs-4').append('<button id=Chart>' + 'Show Chart' + '</button>');

    var bulkD = _.map(data.test2, function(elm){return  elm.date +", " + _.map(elm.estimates, function(est){return _.values(est)})});

    var ddd = data.test2.reverse();

    function drawChart() {
        var data = new google.visualization.DataTable();
            data.addColumn('string', 'Date');
            data.addColumn('number', 'Approve');
            data.addColumn('number', 'Disapprove');
            data.addColumn('number', 'Undecided');

        _.map(ddd, function(x){ var row = [];
          var date = x.date.split('-').join(',');
          _.map(x.estimates, function(est){
            row.push(est.value)})
            if  (row.length == 3){
            data.addRows([[date, row[1], row[0], row[2]]]);
          } else {
          }
        });

        var options = {
          isStacked: 'relative',
          legend: {position: 'top', maxLines: 1},
          title: 'Obama Job Approval',
          hAxis: {title: 'Date', minValue: 0.0,  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0.0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
      $('#Chart').click(function() {
      $('#chart_div').toggle();
    });

  });
});
