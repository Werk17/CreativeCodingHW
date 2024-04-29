let player;
let obstacles = [];
let exit;
let gameWon = false;

function setup() {
  let canvas = createCanvas(800, 600); // Set the dimensions as required
  canvas.parent("canvas-container"); // This tells p5.js to put the canvas in the container element
  player = new Mover(50, 50, 30); // Starting position and size of the player
  obstacles.push(new Mover(random(width), random(height), 20));
  obstacles.push(new Mover(random(width), random(height), 40));
  exit = createVector(width - 50, height - 50); // Position of the exit
}

function draw() {
  background(220);

  if (gameWon) {
    textSize(32);
    text("You Win!", width / 2 - 100, height / 2);
    noLoop(); // Stop the draw loop
    return;
  }

  // Update and display player
  player.update();
  player.display(color("blue"));
  player.checkEdges();

  // Update and display obstacles
  obstacles.forEach((obstacle) => {
    obstacle.wander();
    obstacle.display(color("red"));
    obstacle.checkEdges();
  });

  // Draw the exit
  fill(0, 255, 0);
  ellipse(exit.x, exit.y, 50, 50);

  // Check if player reaches the exit
  if (player.pos.dist(exit) < (player.size + 25) / 2) {
    gameWon = true;
  }
}

function mousePressed() {
  // Add a non-moving obstacle at the mouse position
  obstacles.push(new Mover(mouseX, mouseY, random(20, 50)));
}

function keyPressed() {
  if ([LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW].includes(keyCode)) {
    if (keyCode === UP_ARROW) {
      player.vel.add(createVector(0, -1));
    } else if (keyCode === DOWN_ARROW) {
      player.vel.add(createVector(0, 1));
    } else if (keyCode === LEFT_ARROW) {
      player.vel.add(createVector(-1, 0));
    } else if (keyCode === RIGHT_ARROW) {
      player.vel.add(createVector(1, 0));
    }
    return false; // This prevents any default action from happening
  }
}

class Mover {
  constructor(x, y, size) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.size = size;
  }

  update() {
    this.pos.add(this.vel);
  }

  display(col) {
    fill(col);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  checkEdges() {
    if (this.pos.x > width) this.pos.x = 0;
    else if (this.pos.x < 0) this.pos.x = width;

    if (this.pos.y > height) this.pos.y = 0;
    else if (this.pos.y < 0) this.pos.y = height;
  }

  wander() {
    // Randomly change the velocity
    this.vel.add(p5.Vector.random2D());
    this.vel.limit(2); // Limit the speed
  }
}
