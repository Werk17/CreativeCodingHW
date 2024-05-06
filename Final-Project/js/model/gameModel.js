import { TROOP_TYPES } from "../troopTypes.js";
import Troop from "./troopModel.js";
import Enemy from "./enemyModel.js";

class GameModel {
  constructor() {
    this.mana = 100;
    this.troops = [];
    this.enemies = [];
    this.selectedTroopType = null;
    this.enemySpawnTime = 0;
    this.playerBase = {
      x: 0,
      y: height - 100,
      width: 40,
      height: 100,
      health: 100,
    };
    this.enemyBase = {
      x: width - 40,
      y: height - 100,
      width: 40,
      height: 100,
      health: 100,
    };
    this.gameOver = false;
    this.winner = ""; // 'player' or 'enemy'
  }

  selectTroopType(troopType) {
    if (this.mana >= troopType.cost) {
      this.selectedTroopType = troopType;
    }
  }

  spawnTroop() {
    if (this.selectedTroopType && this.mana >= this.selectedTroopType.cost) {
      this.troops.push(
        new Troop(
          this.selectedTroopType,
          this.playerBase.x + this.playerBase.width + 10,
          height - 30
        )
      );
      this.mana -= this.selectedTroopType.cost;
    }
  }

  spawnEnemy() {
    const enemy = new Enemy(this.enemyBase.x - 10, height - 30);
    this.enemies.push(enemy);
  }

  updateTroops() {
    for (let troop of this.troops) {
      if (!troop.fighting) {
        troop.moveRight();
      }
    }
  }

  updateEnemies() {
    for (let enemy of this.enemies) {
      if (!enemy.fighting) {
        enemy.moveLeft();
      }
    }
  }

  handleCollisions() {
    // Troops vs Enemies
    for (let i = this.troops.length - 1; i >= 0; i--) {
      const troop = this.troops[i];
      troop.fighting = false;

      for (let j = this.enemies.length - 1; j >= 0; j--) {
        const enemy = this.enemies[j];
        if (this.isColliding(troop, enemy)) {
          troop.fighting = true;
          enemy.fighting = true;

          troop.health -= enemy.damage;
          enemy.health -= troop.damage;

          if (troop.health <= 0) {
            this.troops.splice(i, 1);
          }
          if (enemy.health <= 0) {
            this.enemies.splice(j, 1);
          }
          break;
        } else {
          enemy.fighting = false;
        }
      }
    }

    // Troops vs Enemy Base
    for (let troop of this.troops) {
      if (this.isCollidingWithBase(troop, this.enemyBase)) {
        this.enemyBase.health -= troop.damage;
        troop.health = 0;
      }
    }

    // Enemies vs Player Base
    for (let enemy of this.enemies) {
      if (this.isCollidingWithBase(enemy, this.playerBase)) {
        this.playerBase.health -= enemy.damage;
        enemy.health = 0;
      }
    }

    // Remove defeated troops and enemies
    this.troops = this.troops.filter((troop) => troop.health > 0);
    this.enemies = this.enemies.filter((enemy) => enemy.health > 0);

    // Check for game over conditions
    if (this.playerBase.health <= 0) {
      this.gameOver = true;
      this.winner = "enemy";
    } else if (this.enemyBase.health <= 0) {
      this.gameOver = true;
      this.winner = "player";
    }
  }

  isColliding(entityA, entityB) {
    return dist(entityA.x, entityA.y, entityB.x, entityB.y) < 20;
  }

  isCollidingWithBase(entity, base) {
    return (
      entity.x >= base.x &&
      entity.x <= base.x + base.width &&
      entity.y >= base.y &&
      entity.y <= base.y + base.height
    );
  }

  update() {
    if (this.gameOver) return; // Stop updates when the game is over

    this.mana += 0.5; // Regenerate mana over time
    this.updateTroops();
    this.updateEnemies();
    this.handleCollisions();

    // Spawn enemies at a regular interval
    if (frameCount - this.enemySpawnTime >= 120) {
      this.spawnEnemy();
      this.enemySpawnTime = frameCount;
    }
  }
}

export default GameModel;
