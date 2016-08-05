(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

$(document).ready(function() {
  $( "#tabs" ).tabs({
   event: "click"
  });
  $('#chart_div').hide();

  $.post('/about', function(data){
    google.load("visualization", "1", {packages:["corechart"], "callback":drawChart });
    google.setOnLoadCallback(drawChart);

    $('#tabs-4').append('<h4>' + data.chart + " " + data.date + " " + data.choice + " " + Number(data.value).toFixed(2)  + '%'+ '</h4>', '<br>', '<button id=Chart>' + 'Show Chart' + '</button>');
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
          isStacked: 'false',
          legend: {position: 'right'},
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

},{}],2:[function(require,module,exports){
'use strict';

$(document).ready(function() {
  $.post('/', function(urlData){
    $('#temp').append('Temperature: ' + urlData.current_temps +'&deg;' +'F');
    $('#cond').append('Conditions: ' + urlData.conditions);
    $('#weather').append('<img src="'+urlData.outside+'">');
    console.log(urlData.emails);
  });

$('#sub').click(function() {
    var txt = $('input')[0].value;
    var vald = txt.indexOf('@');
    var vald2 = txt.indexOf('.');
    if(vald < 2 || vald2 < 2) {
      alert("Valid emails are more useful.");
    }
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

},{}]},{},[1,2]);
