var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

//gets random inclusive int
function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//accurate recreation of die roll in UR
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

var turn = true; //true: p1, false: p2

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

//player constructor
function player(side) {
  this.side = side;
  this.pawns = [];
  this.score = 0;
}

//box constructor
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
      ctx.fillRect(this.x + this.w / 2 - 10, this.y + this.h / 2 - 10, 20, 20);
      ctx.closePath();
    }
  }
}

//pawn constructor
function pawn(pos, side) {
  this. pos = pos;
  this.side = side;
  this.box = null;
  this.moveTo = function (newPos) {
    this.pos = newPos;
    for (var i = 0; i < boxes.length; i++) {
      if((this.pos == boxes[i].pos && this.side == boxes[i].side) || (this.pos == boxes[i].pos && boxes[i].pos>4)){ this.box = boxes[i]; return;}
      this.box = null;
    }
  }
  this.update = function () {
    if (this.box != null) {
      ctx.beginPath();
      ctx.fillStyle = this.side == 'p1' ? 'blue' : 'green';
      ctx.fillRect(this.box.x + this.box.w / 2 - 10, this.box.y + this.box.h / 2 - 10, 20, 20);
      ctx.closePath();
    }
  }
}
//create players
var p1 = new player('p1');
var p2 = new player('p2');

//assign pawns to players
for (var i = 0; i < 6; i++) {
  p1.pawns.push(new pawn(0,'p1'));
  p2.pawns.push(new pawn(0,'p2'));
}

//assign boxes to array
for (var x = 0; x < 8; x++) {
  for (var y = 0; y < 3; y++) {
  	var track = "none";
    if(y == 0){
    	track = "p2";
    }
    if(y == 2){
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

//update boxes
for (var i = 0; i < boxes.length; i++) {
  boxes[i].update();
}

//game handler
function runGame(p) {
  var r = roll();
  var moveId = prompt('You rolled a '+r+'. which pawn would you like to move? (0-5)');
  p.pawns[moveId].moveTo(p.pawns[moveId].pos+r);

  update();
}

function update() {
  ctx.clearRect(0,0,c.width,c.height);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].update();
  }
  for (var i = 0; i < p1.pawns.length; i++) {
    p1.pawns[i].update();
    p2.pawns[i].update();
  }
}
