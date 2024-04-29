// Setup of script
let eyeX = 170,
  eyeXSpeed = 2;
let mouthY = 240,
  mouthYSpeed = 1;
let noseX = 200,
  noseY = 210,
  noseSpeedX = 1.5,
  noseSpeedY = 1.7;
let titleSize = 16,
  titleGrowing = true;
let headSize = 150,
  headGrowing = true;
let colorShift = 0;
let nameX = 300,
  nameY = 250,
  nameDirection = "right";

// p5.js sketch begins
function setup() {
  createCanvas(400, 400);
  frameRate(30);
}

function draw() {
  background(240);
  // Title
  textSize(titleSize);
  text("My Self Portrait", 50, 30);

  // Dynamic title size
  if (titleSize >= 32 || titleSize <= 16) {
    titleGrowing = !titleGrowing;
  }
  titleSize += titleGrowing ? 1 : -1;

  // Hair
  fill(139, 69, 19); // Brown hair
  arc(200, 150, 150, 150, PI, TWO_PI); // Top hair
  rect(125, 150, 15, 40); // Left side hair
  rect(260, 150, 15, 40); // Right side hair

  // Head - changes size
  fill(255, 224 - colorShift, 189 - colorShift);
  ellipse(200, 200, headSize, headSize + 50);
  if (headSize >= 170 || headSize <= 130) {
    headGrowing = !headGrowing;
  }
  headSize += headGrowing ? 1 : -1;

  // Eyes - moving back and forth along the x-axis
  fill(255);
  ellipse(eyeX, 180, 40, 20);
  ellipse(eyeX + 60, 180, 40, 20);
  eyeX += eyeXSpeed;
  if (eyeX >= 190 || eyeX <= 150) {
    eyeXSpeed *= -1;
    colorShift = (colorShift + 50) % 256; // Color shift
  }

  fill(0); // Black for pupils and eyebrows
  point(170, 180); // Left pupil
  point(230, 180); // Right pupil

  // Eyebrows
  line(160, 160, 180, 165); // Left eyebrow
  line(220, 165, 240, 160); // Right eyebrow

  // Nose
  // triangle(200, 190, 190, 220, 210, 220); // Nose
  // Nose - moving diagonally
  fill(255, 224 - colorShift, 189 - colorShift);
  triangle(noseX, noseY, noseX - 10, noseY + 30, noseX + 10, noseY + 30);
  noseX += noseSpeedX;
  noseY += noseSpeedY;
  if (noseX >= 210 || noseX <= 190) {
    noseSpeedX *= -1;
  }
  if (noseY >= 220 || noseY <= 200) {
    noseSpeedY *= -1;
  }

  // Mouth - moving back and forth along the y-axis
  fill(255, 105, 97);
  rect(180, mouthY, 40, 10);
  mouthY += mouthYSpeed;
  if (mouthY >= 250 || mouthY <= 230) {
    mouthYSpeed *= -1;
  }

  // Body
  fill(100, 100, 255); // Shirt color
  rect(150, 275, 100, 100); // Body

  // Name text moving in a square pattern
  textSize(12);
  text("Charles Werk", nameX, nameY);
  switch (nameDirection) {
    case "right":
      nameX += 2;
      if (nameX > 100) nameDirection = "down";
      break;
    case "down":
      nameY += 2;
      if (nameY > 100) nameDirection = "left";
      break;
    case "left":
      nameX -= 2;
      if (nameX < 50) nameDirection = "up";
      break;
    case "up":
      nameY -= 2;
      if (nameY < 50) nameDirection = "right";
      break;
  }
}
