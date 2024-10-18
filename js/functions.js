// Draw Start Screen
function drawStart() {
  drawMainComponents();

  // Start Text
  ctx.font = "45px Georgia";
  ctx.fillStyle = "rgb(73, 73, 155)";
  ctx.fillText("CLICK TO START", 250, 285);

  ctx.font = "25px Georgia";
  ctx.fillText("USE ARROW KEYS TO MOVE", 260, 320);
  ctx.fillText("REACH THE STAR TO WIN", 265, 350);
}

function runGame() {
  //Logic
  moveplayer1();
  moveWalls();
  bullets();
  checkCollisions();
  currenttime += 1;

  //Draw
  drawGame();
}

function moveplayer1() {
  //Move Player One
  if (keyPressed["ArrowLeft"]) {
    player1.x += -5;
  } else if (keyPressed["ArrowRight"]) {
    player1.x += 5;
  } else if (keyPressed["ArrowDown"]) {
    player1.y += 5;
  } else if (keyPressed["ArrowUp"]) {
    player1.y += -5;
  }
  player1.x = constrain(player1.x, 0, cnv.width - player1.w);
  player1.y = constrain(player1.y, 0, cnv.height - player1.h);
}

function checkCollisions() {
  // Collide;
  //Player One and Maze Walls
  for (let i = 0; i < wallArray.length; i++) {
    wallArray[i].collide();
  }

  //Player One and Bullets

  for (let i = 0; i < bulletArray.length; i++) {
    bulletArray[i].collide();
  }

  // Player One and Star
  if (
    player1.x + player1.w > 495 &&
    player1.x < 600 &&
    player1.y + player1.h > 130 &&
    player1.y < 220
  ) {
    win();
  }
}

function gameOver() {
  state = "gameover";
  setTimeout(reset, 2000);
}

function win() {
  state = "win";
  // Start Text
  if (currenttime > besttime) {
    besttime = currenttime;
  }
  currenttime = 0;
  setTimeout(reset, 2000);
}

// Draw Game Elements

function drawGame() {
  drawMainComponents();

  drawWalls();
  bullets();
}

// Draw Game Over Screen
function drawGameOver() {
  drawMainComponents();
  ctx.font = "60px Georgia";
  ctx.fillStyle = "rgb(73, 73, 155)";
  ctx.fillText("YOU LOST...", 250, 320);
}

function drawGameWin() {
  drawMainComponents();
  ctx.font = "60px Georgia";
  ctx.fillStyle = "rgb(73, 73, 155)";
  ctx.fillText("YOU WON!", 250, 320);
}

//Helper Functions
function reset() {
  state = "start";
  player1 = {
    x: 130,
    y: 200,
    w: 20,
    h: 20,
    color: "rgb(73, 73, 155)",
  };

  movingWall1 = {
    x: 420,
    y: 340,
    w: 20,
    h: 190,
    color: "rgb(73, 73, 155)",
    direct: 3,
  };

  movingWall2 = {
    x: 620,
    y: 400,
    w: 20,
    h: 190,
    color: "rgb(73, 73, 155)",
    direct: 3,
  };
  //Wall Array
  wallArray = [];
  wallArray.push(new Wall(0, 50, 800, 10));
  wallArray.push(new Wall(0, 585, 800, 15));
  wallArray.push(new Wall(785, 50, 15, 900));
  wallArray.push(new Wall(0, 50, 15, 900));

  //Bullet Array
  bulletArray = [];
}

function drawWalls() {
  //Draw Moving Walls
  ctx.fillStyle = movingWall1.color;
  ctx.fillRect(movingWall1.x, movingWall1.y, movingWall1.w, movingWall1.h);

  ctx.fillStyle = movingWall2.color;
  ctx.fillRect(movingWall2.x, movingWall2.y, movingWall2.w, movingWall2.h);
  //Draw Walls
  // Maze Walls
  wallArray.push(new Wall(60, 100, 150, 20));
  wallArray.push(new Wall(60, 100, 20, 260));
  wallArray.push(new Wall(200, 100, 20, 260));
  wallArray.push(new Wall(60, 400, 280, 20));
  wallArray.push(new Wall(320, 100, 20, 450));
  wallArray.push(new Wall(60, 480, 20, 120));
  wallArray.push(new Wall(250, 480, 20, 120));
  wallArray.push(new Wall(150, 420, 20, 120));
  wallArray.push(new Wall(320, 100, 430, 20));
  wallArray.push(new Wall(735, 100, 20, 100));
  wallArray.push(new Wall(390, 250, 455, 20));
  wallArray.push(new Wall(390, 320, 455, 20));
  wallArray.push(new Wall(340, 450, 400, 20));

  for (let i = 0; i < wallArray.length; i++) {
    wallArray[i].draw();
  }
}

function drawMainComponents() {
  // Background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Headers
  ctx.fillStyle = "rgb(73, 73, 155)";
  ctx.fillRect(0, 0, 800, 50);
  ctx.font = "30px Georgia";
  ctx.fillStyle = "grey";
  ctx.fillText(`TIME = ${currenttime}`, 60, 35);
  ctx.fillText(`BEST TIME = ${besttime}`, 300, 35);
  //   //Star
  ctx.drawImage(starImg, 500, 135, 100, 100);

  //Player One
  ctx.fillStyle = "rgb(73, 73, 155)";
  ctx.fillRect(player1.x, player1.y, player1.w, player1.h);
}
