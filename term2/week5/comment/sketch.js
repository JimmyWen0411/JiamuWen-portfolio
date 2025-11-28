let canvasWidth = 500;
let canvasHight = 500;
let panelR = canvasWidth / 1.5;
let sCtr, mCtr, hCtr;

let myComment = 'Please input your comment';

//html
let canvas;
let button;

let displayState = 0;


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element

  frameRate(20);

  background(0);

  rectMode(CENTER);

  addGUI();


  inputSettings();
}
function inputSettings() {
  fill(180);
  noStroke();
  let rectWidth=550;
  rect(12+rectWidth/2,windowHeight-110,rectWidth,50,15);

  let inp = createInput('Please input your comment', 'text');
  inp.position(25, windowHeight-120);
  inp.size(500);
  inp.input(myInputEvent);
}
function myInputEvent() {
  myComment = this.value();
}

function addGUI() {

  //add a button
  if (displayState == 0) {
    button = createButton("Add comment");
  } else if (displayState == 1) {
    button = createButton("Add comment");
  }

  button.addClass("button");
  //Add the play button to the parent gui HTML element
  button.parent("gui-container");

  //Adding a mouse pressed event listener to the button 
  button.mousePressed(handleButtonPress);

}


function handleButtonPress() {

  if (displayState < 2) {
    displayState++;
  } else {
    displayState = 0;
  }

  if (displayState == 0) {
    button.html("Add comment");

    console.log(myComment);
    myCommentProcess(myComment, 0);


  } else if (displayState == 1) {
    button.html("Add comment");

    console.log(myComment);
    myCommentProcess(myComment, 1);

  }

}
function myCommentProcess(displayText, num) {


  let x = generate('canvasWidth');
  let y = generate('canvasHight');
  let r = generate('ellipseRadius');

  fill(generate('rgb'), generate('rgb'), generate('rgb'), 70);
  noStroke();
  ellipse(x, y, r, r);


  fill(255);
  stroke(126, 178, 204);
  let fontSize = map(displayText.length, 0, 200, 20, 10, true);
  textSize(fontSize);
  textWrap(WORD);
  textAlign(CENTER);
  text(displayText, x, y, (2 / 3) * r);




}
function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}

function generate(name) {
  switch (name) {
    //positions
    case 'canvasHight':
      return Math.floor(random(300, windowHeight - 300));
    case 'canvasWidth':
      return Math.floor(random(300, windowWidth - 300));
    case 'ellipseRadius':
      return Math.floor(random(150, 300));
    case 'rgb':
      return Math.floor(random(0, 235));
  }
}
