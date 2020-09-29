const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ballRadius = 10;
let x = Math.floor((Math.random() * canvas.width - 10) + 10);
let y = canvas.height - 30;
let dx = 2; //zmiana położenia piłki
let dy = -2; //zmiana położenia piłki

const paddleHeight = 100;
const paddleWidth = 10;
let paddleY1 = (canvas.height - paddleHeight) / 2;
let paddleY2 = (canvas.height - paddleHeight) / 2;

let upPressed = false;
let downPressed = false;
let wPressed = false;
let sPressed = false;

let score1 = 0;
let score2 = 0;

const one = document.querySelector('.one');
const two = document.querySelector('.two');
const speed = document.querySelector('span');

//stół:
const drawTable = () => {
    ctx.beginPath();
    ctx.setLineDash([10, 15]);
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 600);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'orange';
    ctx.stroke();
}

//rakietki:
const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(0, paddleY1, paddleWidth, paddleHeight);
    ctx.rect(canvas.width - paddleWidth, paddleY2, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//piłka:
const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.closePath();
}

const theGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawTable();
    drawBall();
    drawPaddle();
    drawScore();

    //odbijanie piłki od ścian:
    if (x + dx < ballRadius) {
        if (y >= paddleY1 && y <= paddleY1 + paddleHeight) {
            dx = -dx;
            dx *= 1.05;
            dy *= 1.05;
        } else {
            score2++;
            x = Math.floor((Math.random() * canvas.width - 10) + 10);
            y = canvas.height - 30;
            dx = 2;
            dy = -2;
        }
    } else if (x + dx > canvas.width - ballRadius) {
        if (y >= paddleY2 && y <= paddleY2 + paddleHeight) {
            dx = -dx;
            dx *= 1.05;
            dy *= 1.05;
        } else {
            score1++;
            x = Math.floor((Math.random() * canvas.width - 10) + 10);
            y = canvas.height - 30;
            dx = 2;
            dy = -2;
            // alert("GAME OVER");
            // document.location.reload();
            // clearInterval(interval);
        }
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    
    speed.textContent = (Math.abs(dx)/2 * 100).toFixed(1) + "%";
    x += dx;
    y += dy;

    //ruch prawej rakietki:
    if (upPressed) {
        paddleY2 -= 7;
        if (paddleY2 < 0) {
            paddleY2 = 0;
        }
    } else if (downPressed) {
        paddleY2 += 7;
        if (paddleY2 + paddleHeight > canvas.height) {
            paddleY2 = canvas.height - paddleHeight;
        }
    }

    //ruch lewej rakietki:
    if (wPressed) {
        paddleY1 -= 7;
        if (paddleY1 < 0) {
            paddleY1 = 0;
        }
    } else if (sPressed) {
        paddleY1 += 7;
        if (paddleY1 + paddleHeight > canvas.height) {
            paddleY1 = canvas.height - paddleHeight;
        }
    }

    requestAnimationFrame(theGame); 
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// wciśnięcie przycisku:
function keyDownHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    } else if (e.key == "w") {
        wPressed = true;
    } else if (e.key == "s") {
        sPressed = true;
    }
}

// zwolnienie przycisku:
function keyUpHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    } else if (e.key == "w") {
        wPressed = false;
    } else if (e.key == "s") {
        sPressed = false;
    }
}

const drawScore = () => {
    one.textContent = score1;
    two.textContent = score2;
}

//let interval = setInterval(theGame, 10);
theGame();
// dzięki requestAnimationFrame(theGame) przeglądarka ustawia optymalną prędkość animacji (nie trzeba podawać co ile milisekund);