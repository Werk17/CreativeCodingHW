class Troop {
  constructor(x, y, cost, health, damage, speed) {
    this.x = x;
    this.y = y;
    this.cost = cost;
    this.health = health;
    this.damage = damage;
    this.speed = speed; // Speed at which the troop moves forward
  }

  update(enemies) {
    // Move the troop forward
    this.x += this.speed;

    // Check for collision with enemies and deal damage
    for (let i = enemies.length - 1; i >= 0; i--) {
      let enemy = enemies[i];
      if (dist(this.x, this.y, enemy.x, enemy.y) < 20) {
        // Assuming both have a radius of 20
        enemy.health -= this.damage;
        if (enemy.health <= 0) {
          enemies.splice(i, 1); // Remove enemy if dead
        }
        break; // Stop moving if fighting
      }
    }
  }

  display() {
    fill(0, 0, 255); // Blue color for troops
    ellipse(this.x, this.y, 40, 40); // Represent as a circle
  }
}

export default Troop;
