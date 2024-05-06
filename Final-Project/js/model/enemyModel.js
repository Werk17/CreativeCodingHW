class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 1.5; // Speed of enemy movement
    this.damage = 5; // Damage to apply to troops
    this.health = 65; // Health of the enemy
    this.fighting = false; // Indicates if the enemy is currently fighting
  }

  draw() {
    fill(255, 0, 0); // Red color for enemies
    ellipse(this.x, this.y, 20, 20);
  }

  moveLeft() {
    this.x -= this.speed; // Move left
  }
}

export default Enemy;
