class Snake {
  changeDirection(direction) {
    if (this.moveBuffer.length <= 1) this.moveBuffer.push(direction);

    if (!this.canTurn) {
      return;
    }

    const nextStep = this.moveBuffer.shift();

    switch (nextStep) {
      case "up":
        if (this.yVel !== 0) return;
        this.xVel = 0;
        this.yVel = -1;
        break;
      case "down":
        if (this.yVel !== 0) return;
        this.xVel = 0;
        this.yVel = 1;
        break;
      case "left":
        if (this.xVel !== 0) return;
        this.xVel = -1;
        this.yVel = 0;
        break;
      case "right":
        if (this.xVel !== 0) return;
        this.xVel = 1;
        this.yVel = 0;
        break;
      default:
        return;
    }

    this.canTurn = false;
  }

  eat() {
    const newPosition = [this.head[0] + this.xVel, this.head[1] + this.yVel];

    this.cells.push(newPosition);

    this.len += 1;
    this.head = newPosition;
  }

  move() {
    this.cells.shift();
    const newPosition = [this.head[0] + this.xVel, this.head[1] + this.yVel];

    this.cells.push(newPosition);
    this.head = newPosition;
    this.canTurn = true;
    if (this.moveBuffer.length > 0)
      this.changeDirection(this.moveBuffer.shift());
  }

  hatch() {
    this.len = 1;
    this.cells = [[0, 0]];
    this.head = [0, 0];
    this.xVel = 1;
    this.yVel = 0;
    this.canTurn = true;
    this.moveBuffer = [];
  }

  constructor() {
    this.hatch();
  }
}
