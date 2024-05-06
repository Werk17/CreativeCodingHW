class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  update() {
    this.model.update();
  }

  handleMousePressed() {
    // Check if a troop type button was clicked
    if (mouseX >= 10 && mouseX <= 160 && mouseY >= 50 && mouseY <= 140) {
      this.view.selectTroopButton(mouseX, mouseY);
    } else {
      this.model.spawnTroop(); // Spawn on the left side near the base
    }
  }
}

export default GameController;
