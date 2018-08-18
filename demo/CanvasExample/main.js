window.onload = function(){
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font="bold 60px Arial";
  ctx.fillText("Hello World!", 80, 250);
  ctx.fillStyle = "blue";
  // Here is how you would call the libary
  PanZoom(".panzoom");
}
