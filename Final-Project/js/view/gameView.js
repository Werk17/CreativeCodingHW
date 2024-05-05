import { TROOP_TYPES } from "../troopTypes.js";

class GameView {
  constructor(model) {
    this.model = model;
  }

  render() {
    background(220); // Clear the canvas
    this.displayMana(); // Display current mana
    this.displayTroops(); // Display all deployed troops
    this.displayEnemies(); // Display all enemies
    this.displayTroopTypes(); // Display the troop types and their costs
  }

  displayMana() {
    fill(0);
    textSize(16);
    text(`Mana: ${this.model.mana}`, 10, 30);
  }

  displayTroops() {
    for (let troop of this.model.troops) {
      troop.display(); // Call the draw method of the Troop class directly
    }
  }

  displayEnemies() {
    for (let enemy of this.model.enemies) {
      // Simple red color representation for enemies
      enemy.display(); // Example enemy representation
    }
  }

  displayTroopTypes() {
    TROOP_TYPES.forEach((type, index) => {
      fill(this.model.mana >= type.cost ? "white" : "grey");
      text(`${type.name} - Mana Cost: ${type.cost}`, 10, 50 + index * 20);
    });
  }
}

export default GameView;
