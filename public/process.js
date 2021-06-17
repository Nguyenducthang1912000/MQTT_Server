$(document).ready(function () {
  var socket = io(); 
  socket.on("client to webserver", function (data) {
    var string = data.split(" ");
    var hub = parseInt(data[0]);
    var temp = parseInt(data[1]);
    console.log(hub);
  })
});
