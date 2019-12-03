console.log("Booted");

var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

var clients = [];
var url = "";

app.use(express.static("public"));

io.on("connection", function(socket) {
  console.log("user connected: " + socket.id);
  clients.push(socket);

  if (url != "") {
    socket.emit("url", url);
  }

  socket.on("url", function(msg) {
    io.emit("url", msg);
    url = msg;
    play();
  });

  socket.on("disconnect", function() {
    console.log("user disconnected: " + socket.id);
    clients = clients.filter(value => value !== socket);
    play();
  });
});

http.listen(process.env.PORT || 5000, function() {
  console.log("listening on localhost:3000");
});

function play() {
  if (url != "") {
    clients[0].emit("begin", 1);
  }
}
