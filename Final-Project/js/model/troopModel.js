class Troop {
  constructor(type, x, y) {
    this.name = type.name;
    this.cost = type.cost;
    this.speed = type.speed;
    this.damage = type.damage;
    this.health = type.health;
    this.x = x;
    this.y = y;
    this.fighting = false; // Indicates if the troop is currently fighting
  }

  draw() {
    if (this.name === "Infantry") {
      fill(0, 0, 255); // Blue color for infantry
      rect(this.x, this.y - 10, 20, 20); // Draw rectangle for infantry
    } else if (this.name === "Archer") {
      fill(0, 255, 0); // Green color for archers
      triangle(
        this.x,
        this.y - 10,
        this.x + 10,
        this.y + 10,
        this.x - 10,
        this.y + 10
      ); // Draw triangle for archers
    } else if (this.name === "Cavalry") {
      fill(255, 0, 255); // Purple color for cavalry
      ellipse(this.x, this.y, 20, 20); // Draw circle for cavalry
    }
  }

  moveRight() {
    this.x += this.speed; // Move right based on speed
  }
}

export default Troop;
