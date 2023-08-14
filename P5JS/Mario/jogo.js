

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
let velocidade = 8;
let andarX;
let andarY;
let restart;



let pulando = false;
let velocidadePulo = 10;
let gravidade = 0.5;
let alturaMaximaPulo = 200;
let alturaAtualPulo = 0;



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

  configurarBotoes();

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






  // movimentação
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

  if (keyIsDown(32)) {
    pular();
  }




  winCondition()

  atualizarPulo(); //pulo


  textSize(20)
  text(`x:${andarX} y: ${andarY}`, 30, 30)
}


// COLISAO COLETA
function colisao(objeto) {
  for (let i = 0; i < objeto.length; i++) {
    if (!objeto[i].coletada) {
      const distancia = dist(objeto[i].x, objeto[i].y, andarX, andarY);
      if (distancia < 70) {
        objeto[i].coletada = true;
        return true;
      }
    }
  }
}

// COLISOES COM BLOCOS VERTICAL
function colisaoComBlocos() {
  for (let i = 0; i < blocos.length; i++) {
    if (
      andarX + 90 > blocos[i].x &&
      andarX < blocos[i].x + tamanho &&
      andarY + 90 > blocos[i].y &&
      andarY < blocos[i].y + tamanho
    ) {
      if (andarY + 90 > blocos[i].y && andarY < blocos[i].y) {
        andarY = blocos[i].y - 90;
      } else {
        andarY = blocos[i].y + tamanho;
      }
    }
  }
}




// COLISAO COM BLOCOS HORIZONTAL
function colisaoComBlocos2() {
  for (let i = 0; i < blocos.length; i++) {
    if (
      andarX + 90 > blocos[i].x &&
      andarX < blocos[i].x + tamanho &&
      andarY + 90 > blocos[i].y &&
      andarY < blocos[i].y + tamanho
    ) {
      if (andarX + 90 > blocos[i].x && andarX < blocos[i].x) {
        andarX = blocos[i].x - 90;
      } else {
        andarX = blocos[i].x + tamanho;
      }
    }
  }
}

// FUNÇÕES MOVER
function moveUp() {
  if (marioVoa) {
    andarY -= velocidade;
  }
  colisaoComBlocos();
  if (andarY < 0) {
    andarY = 0
  }
}

function moveDown() {
  andarY += velocidade;
  colisaoComBlocos();
  if (andarY > 424) {
    andarY = 424
  }
}

function moveLeft() {
  if (marioVoa) {
    personagem = loadImage('imagens/mariovoaesq.png');
  } else {
    personagem = loadImage('imagens/marioesq.png');
  }
  andarX -= velocidade;
  colisaoComBlocos2();
  if (andarX < 0) {
    andarX = 0
  }
}

function moveRight() {
  if (marioVoa) {
    personagem = loadImage('imagens/mariovoadir.png');
  } else {
    personagem = loadImage('imagens/mariodir.png');
  }
  andarX += velocidade;
  colisaoComBlocos2();
  if (andarX > 840) {
    andarX = 840
  }
}



// CONTROLE BOTOES
function configurarBotoes() {
  // código para configurar botões de movimento
  const mainElement = document.querySelector('main'); // Seleciona o elemento main

  const bup = createButton('/\\');
  bup.mousePressed(moveUp);
  mainElement.appendChild(bup); // Adiciona o botão ao elemento main

  const bdown = createButton('\\/');
  bdown.mousePressed(moveDown);
  mainElement.appendChild(bdown);

  const bleft = createButton('<<');
  bleft.mousePressed(moveLeft);
  mainElement.appendChild(bleft);

  const bright = createButton('>>');
  bright.mousePressed(moveRight);
  mainElement.appendChild(bright);
}





function winCondition() {
  if (temChave) {
    const distancia = dist(portas[0].x, portas[0].y, andarX, andarY);
    if (distancia < 50) {

      rect(120, 100, 700, 200, 20)
      text('^^', 475, 200)
      textSize(50)
      restart = createButton('Reiniciar')
      restart.mousePressed(reset)
      noLoop()
    }
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


//pulo

// Função de pulo
function pular() {
  if (!pulando && andarY === 424) { // Verifica se o personagem não está pulando e está no chão
    pulando = true;
    alturaAtualPulo = 0;
  }
}

// Atualização do pulo
function atualizarPulo() {
  if (pulando) {
    // Calcula a posição vertical do pulo
    let novaAltura = andarY - velocidadePulo + gravidade * alturaAtualPulo;

    // Verifica se ultrapassou a altura máxima do pulo
    if (novaAltura <= andarY - alturaMaximaPulo) {
      pulando = false;
      novaAltura = andarY - alturaMaximaPulo;
    }

    // Verifica se atingiu o chão
    if (novaAltura >= 424) {
      pulando = false;
      novaAltura = 424;
    }

    // Atualiza a posição vertical do personagem
    andarY = novaAltura;

    // Incrementa a altura atual do pulo
    alturaAtualPulo++;
  }
}

// function keyPressed() {
//   if (keyCode === 32) {
//     pular();
//   }
// }


