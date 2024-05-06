import GameModel from "./model/gameModel.js";
import GameView from "./view/gameView.js";
import GameController from "./controller/gameController.js";

let gameModel;
let gameView;
let gameController;

function setup() {
  const canvas = createCanvas(800, 600);
  canvas.parent("sketch-holder"); // Set the parent of the canvas
  gameModel = new GameModel();
  gameView = new GameView(gameModel);
  gameController = new GameController(gameModel, gameView);

  frameRate(30);
}

function draw() {
  gameController.update();
  gameView.render();
}

function mousePressed() {
  gameController.handleMousePressed();
}

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
