function getURLParameter(name) {
  return decodeURIComponent(
    (location.search.match(RegExp("[?|&]"+name+'=(.+?)(&|$)'))||[,null])[1]
  );
}

if(getURLParameter("id") != "null"){
}

var datapoints = [ ];
$("#graph").highcharts({
  chart: {
    type: 'line'
  },
  title: {
    text: ""
  },
  xAxis: {
    labels: {
      enabled: false
    }
  },
  yAxis: {
    title: {
      text: "Reading"
    }
  },
  legend: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  series: [{
    name: "Data Plot",
    data: datapoints
  }],
  plotOptions: {
    series: {
      marker: {
        enabled: false
      }
    }
  }
});

var myCodeMirror = CodeMirror.fromTextArea( $("#sketchplace")[0], {
  lineNumbers: true,
  matchBrackets: true,
  mode: "text/x-csrc",
  readOnly: true
});

var socket = io.connect(window.location.hostname);
socket.on('newprogram', function(data){
  console.log(data);
  $("#codename").text("Program " + data.name );
  var refreshcode = $("<textarea id='sketchplace'>").text( data.code );
  if( typeof data.xml != "undefined" ){
    // link to blocks!
  }
  $("#sketchholder").html("").append( refreshcode );
  myCodeMirror = CodeMirror.fromTextArea( $("#sketchplace")[0], {
    lineNumbers: true,
    matchBrackets: true,
    mode: "text/x-csrc",
    readOnly: true
  });
  
  // clear dataset
  datapoints = [ ];
  $('#graph').highcharts().series[0].setData(datapoints);
});
socket.on('newdata', function(data){
  //console.log(data.info);
  var line = $("<li>");
  $(line).html(data.info);  
  $("#livedata").append(line);
  $("#livedata").scrollTop( $("#livedata li").height() * $("#livedata li").length )
  
  if(!isNaN(data.info * 1)){
    //datapoints.push([ datapoints.length - 2, data.info * 1 ]);
    $('#graph').highcharts().series[0].addPoint( [ datapoints.length - 2, data.info * 1 ] );
  }
  
});