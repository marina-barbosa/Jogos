let personagem;
let grama;

let tamanho = 64;

let andarX = 0;
let andarY =0;

let randomX =0
let randomY =0

let alvoX = 0
let alvoY =0

let velocidade = 64;

let ok;
let restart;

let pontos=0;

function setup() {
  createCanvas(576, 576);
  aim = loadImage('aim.png');
  target = loadImage('target.png');
  randomTarget()
  
  
}

function draw() {
  
  
  
  if(andarX < 0){
     andarX = 0
  }
  
  if(andarY < 0 ){
     andarY = 0
  }
  
  if(andarX > tamanho*8){
     andarX = tamanho*8
  }
  
  if(andarY > tamanho*8){
     andarY = tamanho*8
  }
  
  background(34, 50, 68);  
  
  image(target, alvoX, alvoY, tamanho, tamanho);
  image(aim, andarX, andarY, tamanho, tamanho);
  
  if(andarX === alvoX && andarY === alvoY){
    pontos++
    rect(0, 0, 100, 30)
    textSize(20)
    text('pontos: '+pontos, 10, 20)
    ok = createButton('OK')
    ok.mousePressed(botaoOk)  
    restart = createButton('Reiniciar')
    restart.mousePressed(resetar) 
    tiro.play()
    noLoop()
  }
  
  textSize(10)
  text(`x:${andarX} y: ${andarY}`, 500, 500)
 
}
function randomTarget(){
  randomX = parseInt(random(1,7));
  randomY = parseInt(random(1,7));

  alvoX = tamanho*randomX;
  alvoY = tamanho*randomY;
}

function botaoOk(){
  andarX = 0
  andarY = 0
  randomTarget()
  restart.remove()
  ok.remove()
  loop()
}

function resetar(){
  andarX = 0
  andarY = 0
  pontos = 0
  randomTarget()
  restart.remove()
  ok.remove()
  loop()
}

function keyPressed(){
  if(keyIsDown(DOWN_ARROW) || keyIsDown(83)){
    andarY += velocidade; 
  }
  
  if(keyIsDown(UP_ARROW) || keyIsDown(87)){
    andarY -= velocidade; 
  }
  
  if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){
    andarX -= velocidade; 
  }
  
  if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
    andarX += velocidade; 
  }
}

function preload(){
  tiro = loadSound("pistolsound.mp3")
}