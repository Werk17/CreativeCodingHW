class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  update() {
    // Update the game model
    this.model.update();
  }

  handleMousePressed() {
    // Check if a troop type is selected and spawn troop if clicked on game area
    let mouseXAdjusted = mouseX - 10; // Assuming 10px padding for UI
    let mouseYAdjusted = mouseY - 50;

    if (mouseYAdjusted % 20 === 0 && mouseXAdjusted < 200) {
      // Assuming UI element positions for troop types
      let index = mouseYAdjusted / 20;
      this.model.selectTroopType(TROOP_TYPES[index]);
    } else {
      if (this.model.selectedTroopType) {
        this.model.spawnTroop(mouseX, mouseY);
      }
    }
  }
}

export default GameController;
