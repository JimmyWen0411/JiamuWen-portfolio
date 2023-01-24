var nP = 30;
var p = [];
var PS = 80;
var maxCounter= 40;
var lines = [];

function checkCollisions() {
  lines = [];
  for(var i=0; i < nP ; i++) {
    for(var j=0; j < nP ; j++) {
      if(i != j){
        var distance = p5.Vector.dist(
          p[i].position,
          p[j].position
        );
        if(distance < PS) {
          if(p[i].counter == 0) {

           p[i].direction.rotate(Math.random());
           p[i].counter = maxCounter;
          }
          if(p[j].counter == 0) {
          p[j].direction.rotate(Math.random());
          p[j].counter = maxCounter;
          }
          lines.push(
           [p[i].position, 
           p[j].position,
           distance ]
          );
        }
      }
    }
  }
}


function createParticle() {
  var particle = {};
  particle.position = createVector(
    Math.random() * width,
    Math.random() * height
  );
  particle.direction = createVector(
    Math.random(),
    Math.random()
  );
  particle.update = function() {
    this.position.add(this.direction);
    if(this.position.x > width ||
      this.position.x < 0)
      this. position.x = width /2;
      if(this.position.y > height || 
        this.position.y < 0)
        this.position.y = height /2;
        if(this.counter > 0)
        this.counter -= 1;
  }
  particle.counter = 0;
  return particle;
}



function setup() {

createCanvas(windowWidth, windowHeight);

  for(var i=0; i < nP ; i++) {
p.push(createParticle());
background(200);
}

}

function draw() {
  fill(127);
  stroke(0);

  checkCollisions();
    for(var i=0; i < nP ; i++) {
    p[i].update();

  }
  for(var i=0;i<lines.length;i++) {
    var color = map(lines[i][2], 0, PS, 0,255);
      stroke(color, 5);
    line(
      lines[i][0].x, lines[i][0].y, 
      lines[i][1].x, lines[i][1].y
    );
  }
}

  function mousePressed() {
    saveFrames('mycelium', 'png', 1, 1)
    }