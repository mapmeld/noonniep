function getURLParameter(name) {
  return decodeURIComponent(
    (location.search.match(RegExp("[?|&]"+name+'=(.+?)(&|$)'))||[,null])[1]
  );  
}

if(getURLParameter("id") != "null"){
}

var socket = io.connect(window.location.hostname);
socket.on('newprogram', function(data){
});
socket.on('newdata', function(data){
  console.log(data.info);
  var line = document.createElement("li");
  line.innerHTML = data.info;
  document.getElementById("livedata").appendChild(line);
});