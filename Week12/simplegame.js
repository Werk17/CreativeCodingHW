let player;
let obstacles = [];
let exitPosition;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("canvas-container");
  player = createPlayer();
  obstacles = createObstacles();
  exitPosition = createExit();
}

function draw() {
  background(220);
  drawBorders();
  handlePlayerMovement();
  obstacles.forEach((obs, index) => moveObstacle(obs, index));
  drawExit(exitPosition);
  drawMouseObject();
  checkWinCondition();
  checkPlayerObstacleCollision();
  displayPlayerHealth();
}

function createPlayer() {
  return { x: 100, y: 100, size: 30, vel: createVector(0, 0), health: 100 };
}

function handlePlayerMovement() {
  if (keyIsDown(LEFT_ARROW)) player.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) player.x += 5;
  if (keyIsDown(UP_ARROW)) player.y -= 5;
  if (keyIsDown(DOWN_ARROW)) player.y += 5;
  checkPlayerWallCollision();
  fill("blue");
  ellipse(player.x, player.y, player.size);
}

function createObstacles() {
  let obs = [
    { x: random(width), y: random(height), size: random(20, 40), color: "red" },
    {
      x: random(width),
      y: random(height),
      size: random(20, 40),
      color: "red",
    },
    { x: random(width), y: random(height), size: random(20, 40), color: "red" },
    {
      x: random(width),
      y: random(height),
      size: random(20, 40),
      color: "red",
    },
    { x: random(width), y: random(height), size: random(20, 40), color: "red" },
  ];
  return obs;
}

function moveObstacle(obs, index) {
  obs.x += random(-15, 15);
  obs.y += random(-15, 15);
  wrapAround(obs);
  fill(obs.color);
  ellipse(obs.x, obs.y, obs.size);
}

function wrapAround(obs) {
  if (obs.x > width) obs.x = 0;
  if (obs.x < 0) obs.x = width;
  if (obs.y > height) obs.y = 0;
  if (obs.y < 0) obs.y = height;
}

function drawBorders() {
  stroke(0);
  noFill();
  rect(1, 1, width - 2, height - 2);
}

function createExit() {
  return { x: width - 40, y: height - 40, size: 50 };
}

function drawExit(exit) {
  fill("yellow");
  rect(exit.x, exit.y, exit.size, exit.size);
}

function drawMouseObject() {
  if (mouseIsPressed) {
    fill("purple");
    ellipse(mouseX, mouseY, 30, 30);
  }
}

function checkWinCondition() {
  if (
    dist(player.x, player.y, exitPosition.x, exitPosition.y) <
    player.size / 2 + exitPosition.size / 2
  ) {
    displayWinMessage();
  }
}

function displayWinMessage() {
  textSize(32);
  fill("black");
  text("You Win!", width / 2 - 100, height / 2);
  noLoop(); // Stop the game
}

function displayPlayerHealth() {
  fill(255, 0, 0);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  text("Health: " + player.health, 10, 10);
}

function checkPlayerWallCollision() {
  let radius = player.size / 2;
  if (player.x - radius < 0) player.x = radius;
  if (player.x + radius > width) player.x = width - radius;
  if (player.y - radius < 0) player.y = radius;
  if (player.y + radius > height) player.y = height - radius;
}

function checkPlayerObstacleCollision() {
  let playerRadius = player.size / 2;
  obstacles.forEach((obs) => {
    let distance = dist(player.x, player.y, obs.x, obs.y);
    if (distance < playerRadius + obs.size / 2) {
      player.health -= 10; // Subtract some health
      console.log("Collision! Health left: " + player.health);
      if (player.health <= 0) {
        console.log("Player destroyed!");
        noLoop(); // Stop the game loop
      }
    }
  });
}
