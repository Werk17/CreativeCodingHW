// p5.js sketch begins
function setup() {
  createCanvas(400, 400);
  background(240);
}

function draw() {
  // Title
  textSize(16);
  text("My Self Portrait", 150, 30);

  // Hair
  fill(139, 69, 19); // Brown hair
  arc(200, 150, 150, 150, PI, TWO_PI); // Top hair
  rect(125, 150, 15, 40); // Left side hair
  rect(260, 150, 15, 40); // Right side hair

  // Face
  fill(255, 224, 189); // Skin color
  ellipse(200, 200, 150, 200); // Head

  // Eyes
  fill(255); // White part of the eyes
  ellipse(170, 180, 40, 20); // Left eye
  ellipse(230, 180, 40, 20); // Right eye

  fill(0); // Black for pupils and eyebrows
  point(170, 180); // Left pupil
  point(230, 180); // Right pupil

  // Eyebrows
  line(160, 160, 180, 165); // Left eyebrow
  line(220, 165, 240, 160); // Right eyebrow

  // Nose
  triangle(200, 190, 190, 220, 210, 220); // Nose

  // Mouth
  fill(255, 105, 97); // Lip color
  rect(180, 240, 40, 10); // Mouth

  // Body
  fill(100, 100, 255); // Shirt color
  rect(150, 275, 100, 100); // Body

  textSize(12); //
  text("by Charles Werk", 300, 300);

  noLoop(); // Stops draw loop
}
