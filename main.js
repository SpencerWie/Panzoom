// Here is how you would call the libary
window.onload = function(){
  
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font="bold 50px Arial";
  ctx.fillText("Hello World", 100, 200);
  ctx.fillStyle = "blue";
  PanZoom("#canvas");
  PanZoom("#img");
}
