// var socket = io();

// document.getElementById("button-cancel").addEventListener("click", function(){
//     console.log("resetting");
// });

var a = document.getElementsByTagName("a");
for (var i = 0; i < a.length; i++) {
  a[i].onclick = function() {
    window.location = this.getAttribute("href");
    return false;
  };
}
