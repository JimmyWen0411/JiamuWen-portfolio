let x;
let loading = true;
let data = {};
let words =[]
let wordData;
function preload() {
  data = loadJSON('./json/WebScraping.json')
}



function setup() {

  createCanvas(windowWidth, windowHeight*0.7);
  background(220);

}

function draw() {

  let wordData = data.content.text[floor(random(0, 310))];
  console.log(wordData);
  x = wordData;
  textAlign(CENTER);
  textSize(30);
  text(x, 0, 0, width);

}
