let xBOLINHA = 300;
let yBOLINHA = 200;
let Diametro = 15;
let raio = Diametro /2;
//criado as variaveis para a criação do circulo.

let VelocidadeXBolinha = 6;
let VelocidadeYBolinha = 6;
//criado as variaveis para a velocidade do circulo.

//variaveis usadas para a criação da raquete.
let xRaquete = 5;
let yRaquete  = 150;
let ComprimentoRaquete = 10;
let AlturaRaquete = 90;
let colidiu;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//variaveis para o placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//variaveis para os sons
let raquetada;
let pontos;
let trilha;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  //codigo usado para determinar o tamanha do cenario.
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentoRaquete();
  ColisaoRaquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  //movimentaRaqueteOponente();
  ColisaoRaqueteOponente();
  incluiPlacar();
  marcaPontos();
  multiplayerOponente();
  calculaChanceDeErrar();
  //nessas ultimas linhas foi usados codigos para a criação do circulo, raquete e das cores.
  
}

function mostraBolinha(){
  circle(xBOLINHA, yBOLINHA, Diametro);
}

function movimentaBolinha(){
   xBOLINHA += VelocidadeXBolinha;
   yBOLINHA += VelocidadeYBolinha; 
}

function verificaColisaoBorda(){
   if (xBOLINHA + raio > width || xBOLINHA - raio < 0){
    VelocidadeXBolinha *= -1;
    // esse if foi usado para denomina os limites de borda do eixo x.
  }
  
  if (yBOLINHA + raio > height || yBOLINHA - raio < 0){
    VelocidadeYBolinha *= -1;
    // esse if foi usado para denomina os limites de borda do eixo y.
  }
}
  

  function mostraRaquete(x, y){
    rect(x, y, ComprimentoRaquete, AlturaRaquete );
    //nessa linha puxamos as variaveis que contem os valores de tamanho da nossa raquete.
  }

function movimentoRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
    //nessas ultimas tres linha fazemos com que a maquina entenda que esta sendo feito um movimento atraves do teclado e damos os parametros para movimento.
  }
  
  if (keyIsDown(DOWN_ARROW)){
    yRaquete +=10;
    
    
  
  //nessas ultimas duas linha informamos o que a maquina deve fazer quando a tecla para baixo é apertada pelo usuario e damos os parametros para movimento.
  }
}

function ColisaoRaquete(){
  if (xBOLINHA - raio < xRaquete + ComprimentoRaquete && yBOLINHA - raio < yRaquete + AlturaRaquete && yBOLINHA + raio > yRaquete){
    VelocidadeXBolinha *= -1;
    raquetada.play();
    //nessas ultimas quatro linhas falamos para a maquina os parametros de colisão da bolinha com a raquete, dessa forma atraves do codiigo && passamos para a maquina que havera duas açoes seguidas.
  }
}


function  movimentaRaqueteOponente(){
  velocidadeYOponente = yBOLINHA - yRaqueteOponente - ComprimentoRaquete /2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function multiplayerOponente(){
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;
    //nessas ultimas tres linha fazemos com que a maquina entenda que esta sendo feito um movimento atraves do teclado e damos os parametros para movimento usando o codigo da tecla.
  }
  
  if (keyIsDown(83)){
    yRaqueteOponente +=10;
        //nessas ultimas tres linha fazemos com que a maquina entenda que esta sendo feito um movimento atraves do teclado e damos os parametros para movimento usando o codigo da tecla.
  }
}

function ColisaoRaqueteOponente(){
  if (yBOLINHA - raio > yRaqueteOponente + ComprimentoRaquete && yBOLINHA - raio < xRaqueteOponente + AlturaRaquete && xBOLINHA + raio > xRaqueteOponente){
    VelocidadeXBolinha *= -1;
    raquetada.play();
    //nessas ultimas quatro linhas falamos para a maquina os parametros de colisão da bolinha com a raquete do oponente, dessa forma atraves do codiigo && passamos para a maquina que havera duas açoes seguidas.
  }
}

function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
  //usado para centralizar o placar
    textSize(16);
  // usado para determinar o tamanho dos caracteres 
    fill(color(255, 140, 0));
  // usado para determinar a cor 
    rect(150, 10, 40, 20);
  //usado para fazer o retangulo em volta do placar.
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    //usado para fazer o retangulo em volta do placar.
    fill(255);
    text(pontosOponente, 470, 26);
  //função para mostrar o placar
}

function marcaPontos(){
  if (xBOLINHA > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBOLINHA < 10){
    pontosOponente += 1;
    ponto.play();
  }
  //essa função foi para determinar quando é ponto nosso ou do oponente.
}
  
  
