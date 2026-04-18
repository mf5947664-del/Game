const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player, bullets, enemies, keys, score, gameRunning;

function init(){
  player = {x:220,y:600,w:60,h:60};
  bullets = [];
  enemies = [];
  keys = {};
  score = 0;
  gameRunning = true;
}

init();

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

document.addEventListener("keydown", e => {
  if(e.code === "Space"){
    bullets.push({x:player.x+25, y:player.y, w:10, h:20});
  }
});

function update(){
  if(!gameRunning) return;

  if(keys["ArrowLeft"] && player.x > 0) player.x -= 6;
  if(keys["ArrowRight"] && player.x < canvas.width-60) player.x += 6;

  bullets.forEach((b,i)=>{
    b.y -= 7;
    if(b.y < 0) bullets.splice(i,1);
  });

  if(Math.random() < 0.03){
    enemies.push({
      x: Math.random()*(canvas.width-50),
      y: 0,
      w:50,
      h:50
    });
  }

  enemies.forEach((e,ei)=>{
    e.y += 4;

    if(collide(e,player)){
      gameOver();
    }

    bullets.forEach((b,bi)=>{
      if(collide(e,b)){
        enemies.splice(ei,1);
        bullets.splice(bi,1);
        score++;
      }
    });

    if(e.y > canvas.height){
      enemies.splice(ei,1);
    }
  });

  document.getElementById("ui").innerText = "Score: " + score;
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "#00aaff";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  ctx.fillStyle = "#ffffff";
  bullets.forEach(b=> ctx.fillRect(b.x,b.y,b.w,b.h));

  ctx.fillStyle = "#ff4444";
  enemies.forEach(e=> ctx.fillRect(e.x,e.y,e.w,e.h));
}

function collide(a,b){
  return a.x < b.x + b.w &&
         a.x + a.w > b.x &&
         a.y < b.y + b.h &&
         a.y + a.h > b.y;
}

function gameOver(){
  gameRunning = false;
  document.getElementById("gameOver").style.display = "block";
}

function restart(){
  init();
  document.getElementById("gameOver").style.display = "none";
}

function loop(){
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();