import { TROOP_TYPES } from "../troopTypes.js";

class GameView {
  constructor(model) {
    this.model = model;
    this.selectedButton = -1; // Index of the selected button
  }

  render() {
    background(220); // Clear the canvas
    this.displayBases();
    this.displayMana();
    this.displayTroops();
    this.displayEnemies();
    this.displayTroopTypes();

    if (this.model.gameOver) {
      this.displayGameOver();
    }
  }

  displayBases() {
    // Player Base
    fill(0, 100, 255); // Blue color for player base
    rect(
      this.model.playerBase.x,
      this.model.playerBase.y,
      this.model.playerBase.width,
      this.model.playerBase.height
    );
    fill(255);
    textSize(14);
    text(
      `Health: ${this.model.playerBase.health}`,
      10,
      this.model.playerBase.y - 10
    );

    // Enemy Base
    fill(255, 0, 0); // Red color for enemy base
    rect(
      this.model.enemyBase.x,
      this.model.enemyBase.y,
      this.model.enemyBase.width,
      this.model.enemyBase.height
    );
    fill(255);
    textSize(14);
    text(
      `Health: ${this.model.enemyBase.health}`,
      this.model.enemyBase.x - 40,
      this.model.enemyBase.y - 10
    );
  }

  displayMana() {
    fill(0);
    textSize(16);
    text(`Mana: ${this.model.mana}`, 10, 30);
  }

  displayTroops() {
    for (let troop of this.model.troops) {
      troop.draw(); // Draw each troop
    }
  }

  displayEnemies() {
    for (let enemy of this.model.enemies) {
      enemy.draw(); // Draw each enemy
    }
  }

  displayTroopTypes() {
    TROOP_TYPES.forEach((type, index) => {
      const x = 10;
      const y = 50 + index * 30;
      const width = 175;
      const height = 25;

      // Determine button color based on availability and selection
      if (this.model.mana >= type.cost) {
        fill(index === this.selectedButton ? "blue" : "white");
      } else {
        fill("grey"); // Indicate insufficient mana
      }

      rect(x, y, width, height); // Draw the button
      fill(0);
      textAlign(LEFT, CENTER);
      text(`${type.name} - Mana: ${type.cost}`, x + 10, y + height / 2);
    });
  }

  displayGameOver() {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    const message =
      this.model.winner === "player"
        ? "You Win!"
        : "Game Over! The Enemy Wins!";
    text(message, width / 2, height / 2);
  }

  selectTroopButton(mouseX, mouseY) {
    TROOP_TYPES.forEach((type, index) => {
      const x = 10;
      const y = 50 + index * 30;
      const width = 150;
      const height = 25;

      if (
        mouseX >= x &&
        mouseX <= x + width &&
        mouseY >= y &&
        mouseY <= y + height &&
        this.model.mana >= type.cost
      ) {
        this.selectedButton = index; // Update selected button
        this.model.selectTroopType(type); // Select the corresponding troop type
      }
    });
  }
}

export default GameView;
