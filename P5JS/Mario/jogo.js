let personagem;
let piso = [];
let pisoImg;
let moedas = [];
let moedaImg;
let somMoeda;
let chaves = [];
let chaveImg;
let portas = [];
let portaImg;
let penas = [];
let penaImg;
let blocos = [];
let blocoImg;
let marioVoa;
let temChave;
let somPena;
let tamanho = 64;
let velocidade = 64;
let andarX;
let andarY;
let restart;
let botaoUp;
let botaoDown;
let botaoLeft;
let botaoRight;



// PRELOAD
function preload() {
  somPena = loadSound("sound/penasound.mp3")
  somMoeda = loadSound("sound/coinsound.wav")
  //somPorta = loadSound("")

  personagem = loadImage('imagens/mariodir.png');
  pisoImg = loadImage('imagens/piso.png');
  blocoImg = loadImage('imagens/bloco.png');
  portaImg = loadImage('imagens/porta.png');
  chaveImg = loadImage('imagens/chave.png');
  penaImg = loadImage('imagens/pena.png');
  moedaImg = loadImage('imagens/moeda.png');
}

// SETUP
function setup() {
  createCanvas(929, 576);

  marioVoa = false;
  temChave = false;
  andarX = 0;
  andarY = 424;

  moedas = [
    { x: 384, y: 128, coletada: false },
    { x: 448, y: 128, coletada: false },
    { x: 512, y: 128, coletada: false }
  ];

  penas = [
    { x: 768, y: 448, coletada: false }
  ]

  chaves = [
    { x: 320, y: 128, coletada: false }
  ]

  portas = [
    { x: 458, y: 424, coletada: false }
  ]

  blocos = [
    { x: 320, y: 192 },
    { x: 384, y: 192 },
    { x: 448, y: 192 },
    { x: 512, y: 192 }
  ]

  botaoMover()



}

// DRAW
function draw() {
  background(2, 96, 188);

  for (let i = 0; i < portas.length; i++) {
    image(portaImg, portas[i].x, portas[i].y, tamanho, 90);
  }

  for (let i = 0; i < moedas.length; i++) {
    if (!moedas[i].coletada) {
      image(moedaImg, moedas[i].x, moedas[i].y, tamanho, tamanho);
    }
  }

  for (let i = 0; i < penas.length; i++) {
    if (!penas[i].coletada) {
      image(penaImg, penas[i].x, penas[i].y, tamanho, tamanho);
    }
  }

  for (let i = 0; i < chaves.length; i++) {
    if (!chaves[i].coletada) {
      image(chaveImg, chaves[i].x, chaves[i].y, tamanho, tamanho);
    }
  }

  for (let i = 0; i < blocos.length; i++) {
    image(blocoImg, blocos[i].x, blocos[i].y, tamanho, tamanho);
  }

  for (let i = 0; i < 15; i++) {
    image(pisoImg, tamanho * i, tamanho * 8, tamanho, tamanho);
  }

  image(personagem, andarX, andarY, 90, 90);



  if (colisao(moedas)) {
    somMoeda.play();
  }

  if (colisao(penas)) {
    marioVoa = true;
    personagem = loadImage('imagens/mariovoadir.png');
    somPena.play();
  }

  if (colisao(chaves)) {
    somMoeda.play();
    temChave = true;
  }


  winCondition()


  textSize(20)
  text(`x:${andarX} y: ${andarY}`, 30, 30)
}


// COLISAO COLETA
function colisao(objeto) {
  for (let i = 0; i < objeto.length; i++) {
    if (!objeto[i].coletada) {
      const distancia = dist(objeto[i].x, objeto[i].y, andarX, andarY);
      if (distancia < 32) { //raio da moeda de 32 pixels
        objeto[i].coletada = true;
        return true;
      }
    }
  }
}

// COLISOES COM BLOCOS
function colisaoUp() {
  let res = false
  for (let i = 0; i < blocos.length; i++) {
    if (andarY - tamanho + 24 == blocos[i].y && andarX == blocos[i].x) {
      res = true;
    }
  }
  if (andarY - tamanho < 0) {
    res = true; // colisao borda
  }
  return res;
}
function colisaoDown() {
  let res = false
  for (let i = 0; i < blocos.length; i++) {
    if (andarY + tamanho + 24 == blocos[i].y && andarX == blocos[i].x) {
      res = true;
    }
  }
  if (andarY + tamanho > 424) {
    res = true; // colisao borda
  }
  return res;
}
function colisaoLeft() {
  let res = false
  for (let i = 0; i < blocos.length; i++) {
    if (andarX - tamanho == blocos[i].x && andarY + 24 == blocos[i].y) {
      res = true;
    }
  }
  if (andarX - tamanho < 0) {
    res = true; // colisao borda
  }
  return res;
}
function colisaoRight() {
  let res = false
  for (let i = 0; i < blocos.length; i++) {
    if (andarX + tamanho == blocos[i].x && andarY + 24 == blocos[i].y) {
      res = true;
    }
  }
  if (andarX + tamanho > tamanho * 13) {
    res = true; // colisao borda
  }
  return res;
}


// FUNÇÕES MOVER
function moveUp() {
  if (!colisaoUp()) {
    if (marioVoa) {
      andarY -= velocidade;
    }
  }
}

function moveDown() {
  if (!colisaoDown()) {
    andarY += velocidade;
  }
}

function moveLeft() {
  if (marioVoa) {
    personagem = loadImage('imagens/mariovoaesq.png');
  } else {
    personagem = loadImage('imagens/marioesq.png');
  }
  if (!colisaoLeft()) {
    andarX -= velocidade;
  }
}

function moveRight() {
  if (marioVoa) {
    personagem = loadImage('imagens/mariovoadir.png');
  } else {
    personagem = loadImage('imagens/mariodir.png');
  }
  if (!colisaoRight()) {
    andarX += velocidade;
  }
}



// CONTROLE TECLADO
function keyPressed() {
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    moveDown();
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    moveUp();
  }

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    moveLeft();
  }

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    moveRight();
  }
}

// CONTROLE BOTOES
function botaoMover() {
  bup = createButton('/\\');
  bup.position(400, 600);
  bup.mousePressed(moveUp);

  bdown = createButton('\\/');
  bdown.position(400, 660);
  bdown.mousePressed(moveDown);

  bleft = createButton('<<');
  bleft.position(320, 630);
  bleft.mousePressed(moveLeft);

  bright = createButton('>>');
  bright.position(480, 630);
  bright.mousePressed(moveRight);
}

function winCondition() {
  if (andarX === 448 && andarY === 424 && temChave) {

    rect(120, 100, 700, 200, 20)
    text('^^', 475, 200)
    textSize(50)
    restart = createButton('Reiniciar')
    restart.mousePressed(reset)
    noLoop()
  }
}

// RESET
function reset() {
  setup()
  preload()
  restart.remove()
  bup.remove()
  bdown.remove()
  bleft.remove()
  bright.remove()
  loop()
}


