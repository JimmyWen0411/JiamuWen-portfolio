// ==================== CONFIG ====================
var num = 2000;
var noiseScale = 500;
var noiseStrength = 1;
var particles = [];

let attractMode = false;
let attractionRadius = 250;  // 🔥 鼠标吸引范围（可增大 300-500 更夸张）
let attractPower = 1.2;      // 🔥 基础吸引力量
let dragInfluence = 0.20;    // 拖拽影响力度，让流体更柔顺

// ==================== SETUP =====================
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i=0;i<num;i++){
    let loc = createVector(random(width),random(height));
    let dir = createVector(1,0);
    let speed = random(0.5,2);
    particles[i] = new Particle(loc,dir,speed);
  }
}

function draw(){
  fill(0,7);
  rect(0,0,width,height);
  for(let p of particles) p.run();
}

// ==================== PARTICLE ===================
class Particle{
  constructor(_loc,_dir,_speed){
    this.loc = _loc;
    this.speed = _speed;
    this.vel = createVector(random(-1,1),random(-1,1));
  }

  run(){
    this.flowBase();          // 基本噪声流动
    if(attractMode) this.pullToMouse();  // 鼠标吸引叠加
    this.loc.add(this.vel);
    this.checkEdges();
    this.display();
  }

  // ★ 粒子持续带噪声，不会停住
  flowBase(){
    let angle=noise(this.loc.x/noiseScale,this.loc.y/noiseScale,frameCount/noiseScale)*TWO_PI*noiseStrength;
    let flow = createVector(cos(angle),sin(angle)).mult(this.speed*0.6);
    this.vel.lerp(flow,0.05);  // 低速缓动更柔
  }

  // ★ 扩大吸引范围，并让吸引呈 fluid-like 流动
  pullToMouse(){
    let mouseV = createVector(mouseX,mouseY);
    let d = p5.Vector.dist(mouseV,this.loc);

    if(d < attractionRadius){  // 🔥 扩大互动范围
      let force = p5.Vector.sub(mouseV,this.loc);

      // 距离越近越强，越远越弱（平滑非线性曲线）
      let strength = attractPower * (1 - d / attractionRadius);
      strength = pow(strength,1.8);   // 调整为更带冲击力的吸引模型

      force.normalize().mult(strength);
      this.vel.add(force);
      this.vel.mult(1 - dragInfluence*0.08);
    }
  }

  checkEdges(){
    if(this.loc.x<0||this.loc.x>width||this.loc.y<0||this.loc.y>height){
      this.loc.set(random(width),random(height));
    }
  }

  display(){
    fill(0,random(120,200),random(160,230));
    ellipse(this.loc.x,this.loc.y,2);
  }
}

// =================== MOUSE =======================
function mousePressed(){ attractMode = true; }
function mouseReleased(){ attractMode = false; }

function doubleClicked(){
  saveFrames("flow", "png", 1,1);
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight*0.7);
}
