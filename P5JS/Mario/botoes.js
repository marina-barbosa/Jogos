import { moveUp, moveDown, moveLeft, moveRight } from './jogo.js';

export function configurarBotoes() {
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