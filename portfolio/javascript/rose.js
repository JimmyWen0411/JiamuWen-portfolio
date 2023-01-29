// Just a copy of https://dailygenerative.art.blog/2019/11/22/rose/
let r;
const iterations = 500;

function setup() {
  createCanvas(windowWidth, windowHeight*0.7);
}

function draw() {
  clear();
  background(220);
  push();
  translate(windowWidth*0.5, windowHeight*0.35);
  // Initialize all values
  const a = random(100, windowWidth / 2);
  const k = int(random(1, 80)) / 8;
  const yo = random(2, 6);
  const aa = random(0.5);
  const b = random(10);
  const c = dullColour(40, 10, 60);

  const variant = Math.ceil(random(0, 4));
  console.log(
    'SELECTED VARIANT: ',
    variant,
    variant == 1
      ? 'sin'
      : variant == 2
      ? 'cos'
      : variant == 3
      ? 'tan'
      : variant == 4
      ? 'atan'
      : undefined,
  );

  for (let t = 0; t < iterations; t += 1) {
    // r = sqrt(2 * pow(a, 2) * cos(2 * t) * sin(3 * t) + pow(tan(t), 2));
    if (variant === 1) {
      r = a * sin(t * k + yo);
    }
    if (variant === 2) {
      r = a * cos(t * k + yo);
    }
    if (variant === 3) {
      r = a * tan(t * k + yo);
    }
    if (variant === 4) {
      r = a * atan(t * k * 0.01);
    }
    const x = r * cos(t);
    const y = r * sin(t);
    ellipseMode(CENTER);
    noStroke();
    fill(c);
    ellipse(x, y, 4, 4);
    push();
    translate(x, y);
    for (let u = 0; u < iterations; u += 15) {
      const rr = u * aa + b;
      const xx = rr * cos(u);
      const yy = rr * sin(u);
      ellipse(xx, yy, 2, 2);
      // console.log(t + ' ' + u);
    }
    pop();
  }
  noLoop();
  pop();
}

function mouseClicked() {
  draw();
}

function keyPressed() {
  if(key=="n"){
    save("roseSketch.jpg");
  }
  if(key=="N"){
    save("roseSketch.jpg");
  }
}

function dullColour(spread, min, max) {
  const x = random(min, max);
  const col = color(
    constrain(x + random(spread) - spread / 2, 0, 255),
    constrain(x + random(spread) - spread / 2, 0, 255),
    constrain(x + random(spread) - spread / 2, 0, 255),
  );
  return col;
}