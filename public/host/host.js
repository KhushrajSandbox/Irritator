var socket = io();
var url;

socket.on("begin", function(msg) {
  document.getElementById("container").innerHTML =
    '<iframe src="' +
    url +
    '" height="0" width="0" style="display: none"></iframe>';
});

socket.on("url", function(msg) {
  url = msg;
  swal("Beginning...", "Successfully sent URL to other devices", "success");
});

document.getElementById("start").addEventListener("click", function() {
  var parsed = youtube_parser(document.getElementById("url").value);
  if (parsed != -1) {
    socket.emit(
      "url",
      "https://www.youtube-nocookie.com/embed/" + parsed + "?autoplay=1&loop=1"
    );
  } else {
    swal("Error", "Invalid Url", "error");
  }
});

function youtube_parser(url) {
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return -1;
  }
}
