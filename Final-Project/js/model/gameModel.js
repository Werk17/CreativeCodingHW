import { TROOP_TYPES } from "../troopTypes.js";
import Troop from "./troopModel.js";

class GameModel {
  constructor() {
    this.mana = 100; // Initial mana
    this.troops = [];
    this.enemies = [];
    this.selectedTroopType = null;
    this.gameTime = 0; // Track game time for difficulty adjustment
    this.TROOP_TYPES = [];
  }

  selectTroopType(troopType) {
    if (this.mana >= troopType.cost) {
      this.selectedTroopType = troopType;
    }
  }

  spawnTroop(x, y) {
    if (this.selectedTroopType && this.mana >= this.selectedTroopType.cost) {
      this.troops.push(new Troop(x, y, this.selectedTroopType));
      this.mana -= this.selectedTroopType.cost;
      this.selectedTroopType = null; // Reset selection after spawning
    }
  }

  generateEnemy() {
    // Adapt enemy spawning based on gameTime
    let difficultyLevel = Math.floor(this.gameTime / 1000); // Example: Increase difficulty every 1000 frames
    let enemyType = difficultyLevel % 2 === 0 ? "standard" : "strong"; // Alternate between types

    // Generate more or stronger enemies as difficulty increases
    for (let i = 0; i < 1 + difficultyLevel; i++) {
      this.enemies.push(new Enemy(random(width), 50, enemyType));
    }
  }

  update() {
    // Increment game time
    this.gameTime++;

    // Regenerate mana
    this.mana += 0.5; // Slow mana regeneration over time

    // Call to generate enemies at an interval
    if (this.gameTime % 500 === 0) {
      // Generate enemies less frequently at the start
      this.generateEnemy();
    }
  }
}

export default GameModel;
