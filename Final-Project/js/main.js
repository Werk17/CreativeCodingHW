import GameModel from "./model/gameModel.js";
import GameView from "./view/gameView.js";
import GameController from "./controller/gameController.js";

// Assuming global access to models, view, and controller
let gameModel;
let gameView;
let gameController;

function setup() {
  createCanvas(800, 600);
  gameModel = new GameModel();
  gameView = new GameView(gameModel);
  gameController = new GameController(gameModel, gameView);

  frameRate(30); // Set the drawing to 30 frames per second
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
