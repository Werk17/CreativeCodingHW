class Enemy {
  constructor(x, y, health, damage, speed) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.damage = damage;
    this.speed = speed; // Speed at which the enemy approaches the player's base
  }

  update(troops) {
    // Move the enemy towards the player's base
    this.x -= this.speed;

    // Check for collision with troops and deal damage
    for (let i = troops.length - 1; i >= 0; i--) {
      let troop = troops[i];
      if (dist(this.x, this.y, troop.x, troop.y) < 20) {
        // Assuming both have a radius of 20
        troop.health -= this.damage;
        if (troop.health <= 0) {
          troops.splice(i, 1); // Remove troop if dead
        }
        break; // Stop moving if fighting
      }
    }
  }

  display() {
    fill(255, 0, 0); // Red color for enemies
    ellipse(this.x, this.y, 40, 40); // Represent as a circle
  }
}

export default Enemy;
