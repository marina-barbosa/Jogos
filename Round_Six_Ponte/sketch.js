let personagem;
let grama;

let tamanho = 64;

let andarX = 0;
let andarY = 256;

let velocidade = 64;

let restart

function setup() {
  createCanvas(576, 576);
  personagem = loadImage('person.png');
  grama = loadImage('tileglass.png');
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
  
  background(10);
  
  for(let i = 0; i < 9; i++){
    for(let j=4; j< 6; j++){
      image(grama, tamanho*i, tamanho*j, tamanho, tamanho);
    }
  }
  
  image(personagem, andarX, andarY, tamanho, tamanho);
  
  if(andarX === 512 && andarY === 320){
    rect(160, 160, 256, 256)
    textSize(35)
    text('Ganhou', 220, 300)
    
    restart = createButton('Reiniciar')
    restart.mousePressed(reset)
    
    noLoop()
  }
  
  if( andarX === 128 && andarY === 256 ||
      andarX === 192 && andarY === 320 ||
      andarX === 256 && andarY === 256 ||
      andarX === 320 && andarY === 256 ||
      andarX === 384 && andarY === 320 ||
      andarX === 448 && andarY === 256 ||
      andarX === 512 && andarY === 256){
    rect(160, 160, 250, 100)
    textSize(35)
    text('Morreu', 230, 220)
    
    restart = createButton('Reiniciar')
    restart.mousePressed(reset)
    
    noLoop()
  }
  
  textSize(10)
  text(`x:${andarX} y: ${andarY}`, 500, 500)
}

function reset(){
  andarX = 0
  andarY = 256
  restart.remove()
  loop()
}

function keyPressed(){  
  
  if(keyIsDown(UP_ARROW)){
    andarX += velocidade;
    andarY = 256;
  }
  
  if(keyIsDown(DOWN_ARROW)){
    andarX += velocidade; 
    andarY = 320;
  }
  
    if(keyIsDown(49)){
    andarX += velocidade;
    andarY = 256;
  }
  
  if(keyIsDown(50)){
    andarX += velocidade; 
    andarY = 320;
  }
  
    if(keyIsDown(97)){
    andarX += velocidade;
    andarY = 256;
  }
  
  if(keyIsDown(98)){
    andarX += velocidade; 
    andarY = 320;
  }
}