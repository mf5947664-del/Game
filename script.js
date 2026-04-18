const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('scoreVal');

// إعدادات الشاشة
canvas.width = 400;
canvas.height = 600;

// متغيرات اللعبة
let score = 0;
let gameActive = true;
const carWidth = 50;
const carHeight = 90;

let player = {
    x: canvas.width / 2 - carWidth / 2,
    y: canvas.height - 120,
    speed: 5
};

let obstacles = [];
let roadLines = [];

// التحكم
let keys = {};
document.addEventListener('keydown', e => keys[e.code] = true);
document.addEventListener('keyup', e => keys[e.code] = false);

// إنشاء عوائق
function createObstacle() {
    if (Math.random() < 0.02) {
        let xPos = Math.random() * (canvas.width - carWidth);
        obstacles.push({ x: xPos, y: -carHeight, speed: 3 + score / 10 });
    }
}

// رسم السيارة
function drawPlayer() {
    ctx.fillStyle = '#ff3e3e'; // سيارة اللاعب
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff3e3e';
    ctx.fillRect(player.x, player.y, carWidth, carHeight);
    
    // تفاصيل السيارة (المصابيح)
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 0;
    ctx.fillRect(player.x + 5, player.y + 5, 10, 5);
    ctx.fillRect(player.x + carWidth - 15, player.y + 5, 10, 5);
}

// تحديث الحركة
function update() {
    if (!gameActive) return;

    // حركة اللاعب
    if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if (keys['ArrowRight'] && player.x < canvas.width - carWidth) player.x += player.speed;

    // حركة العوائق
    obstacles.forEach((obs, index) => {
        obs.y += obs.speed;
        
        // كشف التصادم
        if (player.x < obs.x + carWidth &&
            player.x + carWidth > obs.x &&
            player.y < obs.y + carHeight &&
            player.y + carHeight > obs.y) {
            gameOver();
        }

        // مسح العوائق التي تخرج من الشاشة
        if (obs.y > canvas.height) {
            obstacles.splice(index, 1);
            score++;
            scoreElement.innerText = score;
        }
    });

    createObstacle();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // رسم خطوط الطريق المتحركة
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.setLineDash([20, 20]);
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();

    drawPlayer();

    // رسم العوائق
    ctx.fillStyle = '#3498db';
    ctx.shadowColor = '#3498db';
    obstacles.forEach(obs => {
        ctx.fillRect(obs.x, obs.y, carWidth, carHeight);
    });

    requestAnimationFrame(() => {
        update();
        draw();
    });
}

function gameOver() {
    gameActive = false;
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('finalScore').innerText = score;
}

function resetGame() {
    score = 0;
    obstacles = [];
    gameActive = true;
    player.x = canvas.width / 2 - carWidth / 2;
    scoreElement.innerText = "0";
    document.getElementById('overlay').style.display = 'none';
}

// بدء اللعبة
draw();
