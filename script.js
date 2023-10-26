class Appel{
  constructor(){
      this.x = floor(random(1,raster.aantalKolommen))*raster.celGrootte;
    this.y = floor(random(0,raster.aantalRijen))*raster.celGrootte;
  }
  
  toon() {
    image(appelImage,this.x,this.y,raster.celGrootte,raster.celGrootte);   
  }
}

class Bom {
  constructor() {
    this.x = floor(random(9,raster.aantalKolommen))*raster.celGrootte;
    this.y = floor(random(0,raster.aantalRijen))*raster.celGrootte;
    this.velocity = floor(random(1,3));
  }
  
  toon() {
    image(bomImage,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
  beweeg(){

    
    this.y = (this.velocity) *raster.celGrootte;
  }
}

class raster {
  constructor(r,k) {
    this.aantalRijen = r;
    this.aantalKolommen = k;
    this.celGrootte = null;
  }
  
  berekenCelGrootte() {
    this.celGrootte = canvas.width / this.aantalKolommen;
  }
  
  teken() {
    push();
    noFill();
    stroke('grey');
    for (var rij = 0;rij < this.aantalRijen;rij++) {
      for (var kolom = 0;kolom < this.aantalKolommen;kolom++) {
        rect(kolom*this.celGrootte,rij*this.celGrootte,this.celGrootte,this.celGrootte);
      }
    }
    stroke('orange');
    for (var rij = 0;rij < this.aantalRijen;rij++) {
      rect(0,rij*this.celGrootte,this.celGrootte,this.celGrootte);
    }
    for (var kolom = 0;kolom < this.aantalKolommen;kolom++) {
      rect(kolom*this.celGrootte,0,this.celGrootte,this.celGrootte);
    }
    pop();
  }
}

class Jos {
  constructor() {
    this.x = 400;
    this.y = 300;
    this.animatie = [];
    this.frameNummer =  3;
    this.stapGrootte = null;
    this.gehaald = false;
    this.levens = 1;
    this.kabloom = false;
  }
  
  beweeg() {
    if (keyIsDown(65)) {
      this.x -= this.stapGrootte;
      this.frameNummer = 2;
    }
    if (keyIsDown(68)) {
      this.x += this.stapGrootte;
      this.frameNummer = 1;
    }
    if (keyIsDown(87)) {
      this.y -= this.stapGrootte;
      this.frameNummer = 4;
    }
    if (keyIsDown(83)) {
      this.y += this.stapGrootte;
      this.frameNummer = 5;
    }
    
    this.x = constrain(this.x,0,canvas.width);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
    
    if (this.x == canvas.width) {
      this.gehaald = true;
    }
  }
 
  staatop(appel) {
    if (this.x == appel.x && this.y == appel.y) {
      return true;
    }
    else {
      return false;
    }
  }

  wordtGeraakt(vijand) {
    if (this.x == vijand.x && this.y == vijand.y) {
      return true;
    }
    else {
      return false;
    }
  }

  
  toon() {
    image(this.animatie[this.frameNummer],this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}  

class Vijand {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.stapGrootte = null;
  }

  beweeg() {
    this.x += floor(random(-1,2))*this.stapGrootte;
    this.y += floor(random(-1,2))*this.stapGrootte;

    this.x = constrain(this.x,0,canvas.width - raster.celGrootte);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
  }
  
  toon() {
    image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}

intersect(bommenzak) {
  for (var x = 0;x < bommenzak.length;x++) {
    if (this.x == bommenzak[x].x && this.y == bommenzak[x].y) {
      kabloom = true;
    }
  
    return this.kabloom false;
  }
}


function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  appelImage = loadImage("images/sprites/appel_1.png")
  bomImage = loadImage("images/sprites/bom_100px.png");
}
var bommenzak = [];
function setup() {
  canvas = createCanvas(900,600);
  canvas.parent();
  frameRate(30);
  textFont("Verdana");
  textSize(90);
  
  raster = new raster(12,18);
  
  raster.berekenCelGrootte();

  appel1 = new Appel();
  bom1 = new Bom();

  for(var b = 0; b<5; b++){
    bommenzak.push(new Bom());
  }
  
  eve = new Jos();
  eve.stapGrootte = 1*raster.celGrootte;
  for (var b = 0;b < 6;b++) {
    frameEve = loadImage("images/sprites/Eve100px/Eve_" + b + ".png");
    eve.animatie.push(frameEve);
  }
  
  alice = new Vijand(700,200);
  alice.stapGrootte = 1*eve.stapGrootte;
  alice.sprite = loadImage("images/sprites/Alice100px/Alice.png");

  bob = new Vijand(600,400);
  bob.stapGrootte = 1*eve.stapGrootte;
  bob.sprite = loadImage("images/sprites/Bob100px/Bob.png");  

}


function draw() {
  background(brug);
  raster.teken();

  for(var i = 0; i < bommenzak.length; i++){
    bommenzak[i].toon();
    bommenzak[i].beweeg(); 
  }
  
  eve.beweeg();
  alice.beweeg();
  bob.beweeg();
  appel1.toon();
  eve.toon();
  alice.toon();
  bob.toon();
  bom1.toon();
  
  
  fill("black");
  textSize(50)
  text("levens aantal:" + eve.levens, 10,50)
  
  if (eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob) || eve.intersect(kabloom)) {
   eve.levens -= 1
  }

   if (eve.staatop(appel1)) {
    eve.levens += 1

     appel1.x = floor(random(1,raster.aantalKolommen))*raster.celGrootte;
    appel1.y = floor(random(0,raster.aantalRijen))*raster.celGrootte;
   }

if(eve.levens==0 || eve.levens<0){
    background('red');
    fill('black');
    textSize(80);
    text("skill issue",30,300);
    noLoop();
}
  
  if (eve.gehaald) {
    background('green');
    fill('white');
    text("Je hebt gewonnen!",30,300);
    noLoop();
  }

}