// Hier defineren we Appel als een class. In de constructor word er een random plek voor Appel gevonden in de grenzen van de Raster.
class Appel{
  constructor(){
      this.x = floor(random(1,raster.aantalKolommen))*raster.celGrootte;
    this.y = floor(random(0,raster.aantalRijen))*raster.celGrootte;
  }
  // In de toon functie word de AppelImage getoond op de plek van Appel.
  toon() {
    image(appelImage,this.x,this.y,raster.celGrootte,raster.celGrootte);   
  }
}
//Hier defineren we Bom als een class. In de constructor word er een random plek gevonden voor Bom in de grenzen van de Raster, mits 9 >= x >=raster.aantalKolommen.
class Bom {
  constructor() {
    this.x = floor(random(9,raster.aantalKolommen))*raster.celGrootte;
    this.y = floor(random(0,raster.aantalRijen))*raster.celGrootte;
    
  }
  //In de toon functie word de BomImage getoond op de plek van Bom.
  toon() {
    image(bomImage,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
  //in de beweeg functie word Bom 1 raster blok omlaag gezet en als de plek van Bom er buiten zit word Bom terug gezet.
  beweeg(){

    
    this.y += 1*raster.celGrootte;
    
    if(this.y > (raster.aantalRijen*raster.celGrootte)){
      this.y = 0
    
    }
  }
}
//Hier defineren we raster als een class. In de constructor bepalen we dingen zoals de grootte van het raster, hoeveel rijen en kolommen het heeft als r en k.
class raster {
  constructor(r,k) {
    this.aantalRijen = r;
    this.aantalKolommen = k;
    this.celGrootte = null;
  }
  //Hier delen we de canvas.width door de aantal kolommen we willen, zodat het allemaal lekker past in de canvas.
  berekenCelGrootte() {
    this.celGrootte = canvas.width / this.aantalKolommen;
  }
  //Hier word de raster geconstructueerd. Hier maken we gebruik van een for loop in een for loop om een volledige raster te tekenen met de parameters van de individuele rectangels in regel 53. In de for loop van (var rij) schuiven we Y en in de for loop van (var kolom) schuiven we X.
  teken() {
    push();
    noFill();
    stroke('grey');
    for (var rij = 0;rij < this.aantalRijen;rij++) {
      for (var kolom = 0;kolom < this.aantalKolommen;kolom++) {
        rect(kolom*this.celGrootte,rij*this.celGrootte,this.celGrootte,this.celGrootte);
      }
    }
    //Hier inplaats van een for loop in een for loop, hebben we 2 for loops apart voor rijen en kolommen en hebben we de stroke naar 'orange' verandered. het effect hiervan is dat de bovenste en linker rand van de raster rectangles heeft van een randkleur van 'orange'.
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
//hier defineren we de class Jos.
class Jos {
  constructor() {
    this.x = 400;
    this.y = 300;
    this.animatie = [];
    this.frameNummer =  3;
    this.stapGrootte = null;
    this.gehaald = false;
    this.levens = 2;
    this.boom = false;
    
  }
  //Hier word de functie om Jos te laten bewegen aangemaakt. met het gebruik van de keys WASD kan de speler Jos laten bewegen mits het in de canvas zit (regel 99-100).  
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
    // V dit betekent dat als Jos helemaal rechts is van de canvas, dan heeft de speler gewonnen (this.gehaald = true).
    if (this.x == canvas.width) {
      this.gehaald = true;
    }
  }

  wordtGeraakt(item) {
    if (this.x == item.x && this.y == item.y) {
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
//
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




//in fuction preload word images geladen voordat de spel start.
function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  appelImage = loadImage("images/sprites/appel_1.png")
  bomImage = loadImage("images/sprites/bom_100px.png");
}
//In functie setup word er verschillende dingen gedefinieerd die nodig zijn voor he spel te werken.
var bommenlijst = [];
function setup() {
  canvas = createCanvas(900,600);
  canvas.parent();
  frameRate(5);
  textFont("Verdana");
  textSize(90);
  
  raster = new raster(12,18);
  
  raster.berekenCelGrootte();
// Hier is de appel
  appel1 = new Appel();
  
//hier worden er 10 Bommen aan de lijst bommenlijst toegevoegd.
  for(var b = 0; b<10; b++){
    bommenlijst.push(new Bom());
  }
  //hier word er 1 jos aan gemaakt met de naam "eve". Ook word de stapgrootte gedefineerd als 1*raster.celgrootte zodat Jos daadwerkelijk in het midden van de raster stapt.
  eve = new Jos();
  eve.stapGrootte = 1*raster.celGrootte;
  for (var b = 0;b < 6;b++) {
    frameEve = loadImage("images/sprites/Eve100px/Eve_" + b + ".png");
    eve.animatie.push(frameEve);
  }
  //Hier worden er twee vijanden gemaakt met de class "vijand". beide hebben een eigen png (alice en bob)
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
//Hier wordt de array "bommenlijst" gecreerd en er bommen worden toegevoegd. Hier wordt ook als Jos op de bommen staat gekeken of hij er een aan raakt. Als dit waar is, verliest hij een leven.
  for(var i = 0; i < bommenlijst.length; i++){
    bommenlijst[i].toon();
    bommenlijst[i].beweeg(); 
// Hier wordt de bom van het scherm verdwenen wanneer Jos met meerdere levens op een bom staat.
    if (eve.wordtGeraakt(bommenlijst[i])) {
      eve.levens -= 1;
      bommenlijst.splice(i,1);
    }
  }
  
  eve.beweeg();
  alice.beweeg();
  bob.beweeg();
  appel1.toon();
  eve.toon();
  alice.toon();
  bob.toon();
  
  
  
  fill("black");
  textSize(50)
  text("levens aantal:" + eve.levens, 10,50)

// Hier wordt gekeken als bob of alice op Jos staan. Als dat zo is, komt er een leven af.
  if (eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob)) {
   eve.levens -= 1
  }

  // Hier wordt als Jos op appel staat, 1 leven toegevoegd wordt.
   if (eve.wordtGeraakt(appel1)) {
    eve.levens += 1
// Hier wordt de appel verplaatst over de raster.
     appel1.x = floor(random(1,raster.aantalKolommen))*raster.celGrootte;
    appel1.y = floor(random(0,raster.aantalRijen))*raster.celGrootte;
   }
// Hier kan je zien als Jos geen levens meer heeft, dat er een loser screen gaat staan inplaats van de speelplek.
if(eve.levens==0 || eve.levens<0){
    background('red');
    fill('black');
    textSize(80);
    text("skill issue",30,300);
    noLoop();
}
  // als Jos de overkant heeft bereikt gaat er een victory screen staan inplaats van het speelplek.
  if (eve.gehaald) {
    background('green');
    fill('white');
    text("Je hebt gewonnen!",30,300);
    noLoop();
  }

}