var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roll(){
	var temp = rand(0,15);
  if(temp<1){
  	return 0;
  }
  if(temp>=1 && temp <5){
  	return 1;
  }
  if(temp>=5 && temp <11){
  	return 2;
  }
  if(temp>=11 && temp <15){
  	return 3;
  }
  if(temp == 15){
  	return 4;
  }
}

console.log(roll());

var map = [
  [2, 1, 1, 1, 0, 0, 2, 1],
  [1, 1, 1, 2, 1, 1, 1, 1],
  [2, 1, 1, 1, 0, 0, 2, 1]
];

var mapOrder = [
  [4, 3, 2, 1, 0, 0, 14, 13],
  [5, 6, 7, 8, 9, 10, 11, 12],
  [4, 3, 2, 1, 0, 0, 14, 13]
];



var boxWidth = 500;
var boxHeight = boxWidth / 2.5;
var boxes = [];

function box(x, y, w, h, rosette, order, side) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.side = side;
  this.rosette = rosette;
  this.pos = order;
  this.update = function() {
    ctx.strokeRect(x, y, w, h);
    if (this.rosette) {
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.fillRect(x + w / 2 - 10, y + h / 2 - 10, 20, 20);
      ctx.closePath();
    }
  }
}

for (var x = 0; x < 8; x++) {
  for (var y = 0; y < 3; y++) {
  	var track = "none";
    if(y == 0){
    	track = "p2";
    }
    if(y == 3){
    	track = "p1";
    }
    switch (map[y][x]) {
      case 0:
        break;
      case 1:
        boxes.push(new box(x * boxWidth / 8 + c.width / 2 - boxWidth / 2, y * boxHeight / 3 + c.height / 2 - boxHeight / 2, boxWidth / 8, boxHeight / 3, false, mapOrder[y][x], track));
        break;
      case 2:
        boxes.push(new box(x * boxWidth / 8 + c.width / 2 - boxWidth / 2, y * boxHeight / 3 + c.height / 2 - boxHeight / 2, boxWidth / 8, boxHeight / 3, true, mapOrder[y][x], track));
        break;
      default:
        break;
    }
  }
}

for (var i = 0; i < boxes.length; i++) {
  boxes[i].update();
}


var turn = true;

function pawn(pos) {
  var pos = pos;
}

if (turn) {}
