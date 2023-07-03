let personagem;
let piso;
let moeda;
let chave;
let porta;
let pena;
let bloco;
let voa = false;
let temchave = false;
let penaNaoTocou = true;

let tamanho = 64;
let andarX = 0;
let andarY = 424;
let velocidade = 64;
let restart

function setup() {
  createCanvas(929, 576);
  personagem = loadImage('imagens/mariodir.png');
  piso = loadImage('imagens/piso.png');
  porta = loadImage('imagens/porta.png');
  chave = loadImage('imagens/chave.png');
  pena = loadImage('imagens/pena.png');
  moeda1 = loadImage('imagens/moeda.png');
  moeda2 = loadImage('imagens/moeda.png');
  moeda3 = loadImage('imagens/moeda.png');
  bloco = loadImage('imagens/bloco.png');  
    
}



function draw() { 
    
  
  if(andarX < 0){
     andarX = 0
  }
  
  if(andarY < 0 ){
     andarY = 40
  }
  
  if(andarX > tamanho*13){
     andarX = tamanho*13
  }
  
  if(andarY > 424){
     andarY = 424
  }
  
  background(2, 96, 188);
  
  for(let i = 0; i < 15; i++){    
    image(piso, tamanho*i, tamanho*8, tamanho, tamanho);    
  }
  
  for(let i = 5; i < 9; i++){
    image(bloco, tamanho*i, tamanho*3, tamanho, tamanho);
  }  
  
  image(moeda1, 384, 128, tamanho, tamanho);  
  image(moeda2, 448, 128, tamanho, tamanho);
  image(moeda3, 512, 128, tamanho, tamanho);
  image(pena, 768, 448, tamanho, tamanho);
  image(porta, 458, 424, tamanho, 90);
  image(chave, tamanho*5, 128, tamanho, tamanho);
  
  image(personagem, andarX, andarY, 90, 90);  
  
  if(andarX === 768 && andarY === 424){
    voa = true;
    personagem = loadImage('imagens/mariovoadir.png');
    pena = loadImage('imagens/nada.png');
    if(penaNaoTocou){
      penaNaoTocou = false;
      pegaPena.play();
    }
  }
  
  if(andarX === 320 && andarY === 104){
    temchave = true;    
    chave = loadImage('imagens/nada.png');
  }
  
  if(andarX === 384 && andarY === 104){        
    moeda1 = loadImage('imagens/nada.png');    
  }
  
  if(andarX === 448 && andarY === 104){        
    moeda2 = loadImage('imagens/nada.png');
    
  }
  if(andarX === 512 && andarY === 104){        
    moeda3 = loadImage('imagens/nada.png'); 
    }
   
  
  
  if(andarX === 448 && andarY === 424 && temchave){
    
    rect(120, 100, 700, 200, 20)
    text('^^', 475, 200)
    textSize(50)    
    restart = createButton('Reiniciar')
    restart.mousePressed(reset)    
    noLoop()
  } 


    textSize(20)
    text(`x:${andarX} y: ${andarY}`, 30, 30)
}

  
  
  



function reset(){ 
  setup()
  andarX = 0
  andarY = 424  
  voa = false
  temchave = false
  penaNaoTocou = true;
  restart.remove()
  loop()
}




function keyPressed(){
  if(keyIsDown(DOWN_ARROW) || keyIsDown(83)){
    andarY += velocidade; 
  }
  
  if(keyIsDown(UP_ARROW) || keyIsDown(87)){
    if(voa){
      andarY -= velocidade; 
    }
  }
  
  if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){
    andarX -= velocidade; 
    if(voa){
      personagem = loadImage('imagens/mariovoaesq.png');
    }else{
      personagem = loadImage('imagens/marioesq.png');
    }    
  }
  
  if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
    andarX += velocidade;
    if(voa){      
      personagem = loadImage('imagens/mariovoadir.png');      
    }else {
      personagem = loadImage('imagens/mariodir.png');
    }     
  }   
}




function preload(){
  pegaPena = loadSound("sound/penasound.mp3")
}
