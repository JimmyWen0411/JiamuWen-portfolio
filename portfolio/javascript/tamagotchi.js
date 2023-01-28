var tamagotchi;
var appleList = [];

function copyVector(v) {
  return createVector(v.x, v.y);
}

class Apple {
  constructor(x, y, size) {
    this.center = createVector(x, y);
    this.size = size;
    this.original = copyVector(center);
    this.current = "";
    this.grabbed = false;
  }

  draw() {
    ellipse(this.center.x, this.center.y, this.size);
  }

  checkGrabbed() {
    this.grabbed = mouseIsInObject(this.center.x, this.center.y, this.size);
  }
  reset() {
    this.grabbed = false;
    this.center = createVector(this.original.x, this.original.y);
  }
  followMouse() {
    if (this.grabbed) {
      this.center.x = mouseX - width / 2;
      this.center.y = mouseY - height / 2;
    }
  }
}

function generateApples(number) {
  for (let i = 0; i < number; i++) {
    var v = createVector(
      24 + i * 26 * 1.3 - width / 2,
      height - 20 - height / 2
    );
    appleList.push({
      appleCenter: v,
      grabbed: false,
      size: 26,
      original: createVector(v.x, v.y),
      draw: function () {
        ellipse(this.appleCenter.x, this.appleCenter.y, this.size);
      },
      checkGrabbed: function () {
        this.grabbed = mouseIsInObject(
          this.appleCenter.x,
          this.appleCenter.y,
          this.size
        );
      },
      reset: function () {
        this.grabbed = false;
        this.appleCenter = createVector(this.original.x, this.original.y);
      },
      followMouse: function () {
        if (this.grabbed) {
          this.appleCenter.x = mouseX - width / 2;
          this.appleCenter.y = mouseY - height / 2;
        }
      },
    });
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight*0.7);
  
  noStroke();
  generateApples(3);

  tamagotchi = {
    points: [],
    size: 100,
    setup: function () {
      for (var index = 0; index < 36; index++) {
        var v = createVector(0, random(0.78, 1));
        this.points.push(v.rotate(((PI * 2) / 36) * index));
      }
      console.log(this.points);
    },
    drawTamagotchi: function () {
      beginShape();
      for (let i = 0; i < this.points.length; i++) {
        fill(106, 90, 205);
        var p = this.points[i];
        var t = p5.Vector.mult(p, this.size);
        curveVertex(t.x, t.y);
      }
      endShape();

      fill(255);
      ellipse(this.size * 0.12, 0, this.size * 0.1);
      ellipse(-this.size * 0.12, 0, this.size * 0.1);

      fill(0);
      var v = createVector(mouseX - width / 2, mouseY - height / 2);
      v.normalize();
      v.mult(this.size * 0.02);
      ellipse(this.size * 0.12 + v.x, v.y, this.size * 0.05);
      ellipse(-this.size * 0.12 + v.x, v.y, this.size * 0.05);
    },
    grow: function () {
      this.size *= random(1.1, 1.5);
      this.size = min(this.size, 220);
      var rot = random(-0.01, 0.01);
      for (let i = 0; i < this.points.length; i++) {
        this.points[i].rotate(rot);
      }
    },
    shrink: function () {
      this.size *= random(0.9995, 1);
      this.size = max(this.size, 30);
    },
  };

  tamagotchi.setup();
}

function draw() {
  translate(width / 2, height / 2);
  background(151,136,200);

  tamagotchi.drawTamagotchi();
  tamagotchi.shrink();

  drawApples();
}

function drawApples() {
  fill(220, 20, 60);
  for (let i = 0; i < appleList.length; i++) {
    var apple = appleList[i];
    // console.log(i);
    apple.draw();
  }
}

function mousePressed() {
  for (let index = 0; index < appleList.length; index++) {
    appleList[index].checkGrabbed();
  }
}

function mouseReleased() {
  for (let index = 0; index < appleList.length; index++) {
    const apple = appleList[index];
    if (apple.grabbed) {
      if (mouseIsInObject(0, 0, tamagotchi.size * 1.2)) {
        eatApple(index);
        tamagotchi.grow();
      } else {
        apple.reset();
      }
    }
  }
}

function checkAppleIsEmpty() {
  if (appleList.length == 0) generateApples(4);
}

function keyPressed() {
  if (keyCode == 32) checkAppleIsEmpty();
}

function eatApple(appleIndex) {
  appleList.splice(appleIndex, 1);
}

function mouseDragged() {
  // move grabbed apple follow mouse x,y
  for (let index = 0; index < appleList.length; index++) {
    appleList[index].followMouse();
  }
}

function mouseIsInObject(objectX, objectY, radius) {
  return (
    mouseX - width / 2 < objectX + radius / 2 &&
    mouseX - width / 2 > objectX - radius / 2 &&
    mouseY - height / 2 > objectY - radius / 2 &&
    mouseY - height / 2 < objectY + radius / 2
  );
}
