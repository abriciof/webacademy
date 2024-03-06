// set up canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number
function random(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// function to generate random RGB color value
function randomRGB() {
    // aplicando tons de azul e verde
    return `rgb(${random(0, 100)},${random(155, 255)},${random(155, 255)})`;
}

// Modelando o quadrado
function Square(x, y, velX, velY, color, size){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

// Desenho do quadrado
Square.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
};

// Update da posição do quadrado
Square.prototype.update = function (){
    if (this.x + this.size >= width) {
        this.velX = -(Math.abs(this.velX));
    }

    if (this.x - this.size <= 0) {
        this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
        this.velY = -(Math.abs(this.velY));
    }

    if (this.y - this.size <= 0) {
        this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
};
  
// Detectando as colisões
Square.prototype.collisionDetect = function () {
    for (let j = 0; j < squares.length; j++) {
        if (!(this === squares[j])) {
            const dx = this.x - squares[j].x;
            const dy = this.y - squares[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
  
            if (distance < this.size + squares[j].size) {
                squares[j].color = this.color = randomRGB()
            }
        }
    }
};
  
// controlando aparecimento de bolas na tela
let squares = [];

// minimo de bolas = 3s0
while (squares.length < 30) {

    // variando tamanho entre size 5 e 10
    let size = random(20,30);

    // iniciando a bola
    let square = new Square(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7,7),
        random(-7,7),
        randomRGB(),
        size
    );

    // adicionando bola
    squares.push(square);
};

// loop
function loop() {
    ctx.fillStyle = 'rgba(150, 0, 150, 0.19)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < squares.length; i++) {
        squares[i].draw();
        squares[i].update();
        squares[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

// Iniciando
loop();