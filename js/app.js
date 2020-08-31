class Sun {
  constructor() {
    this.x = 410;
    this.y = 5;
  }
}
class Enemy {
  constructor(x, y, direction, style) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.style = style;
    this.speed = parseInt(Math.floor(Math.random() * (3 - 2 + 1)) + 2);
  }
  update(dt) {
    if (this.direction === 'rtl' && this.x >= 10) {
      this.x = this.x - this.speed;
      if (this.x < 10) {
        this.direction = 'ltr';
        this.x = this.x + this.speed;
      }
    } else if (this.direction === 'ltr' && this.x < 800) {
      this.x = this.x + this.speed;
      if (this.x > 790) {
        this.direction = 'rtl';
        this.x = this.x - this.speed;
      }
    }
  }
}

let lives = 3;
let level = 0;
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  update() {
    if ((this.x < enemy1.x + 90 && this.x + 90 > enemy1.x && this.y < enemy1.y + 90 && this.y + 90 > enemy1.y) ||
      (this.x < enemy2.x + 90 && this.x + 90 > enemy2.x && this.y < enemy2.y + 90 && this.y + 90 > enemy2.y) ||
      (this.x < enemy3.x + 90 && this.x + 90 > enemy3.x && this.y < enemy3.y + 90 && this.y + 90 > enemy3.y)) {
      this.y = 430;
      this.x = 410;
      --lives;
      document.getElementById('lives').innerText = `Lives : ${lives}`;
    }
    if (this.y <= 90 && this.x > 300 && this.x < 500) {
      this.y = 430;
      this.x = 410;
      ++level;
      if (level <= 3) { //increase the speed of enemies until level 3
        enemy1.speed = enemy1.speed + 1;
        enemy2.speed = enemy2.speed + 1;
        enemy3.speed = enemy3.speed + 1;
      }
      document.querySelector('#score').innerText = `level : ${level}`;
    }
    if (lives === 0) { //reset lives  
      level = 0;
      lives = 3;
      document.getElementById('lives').innerText = `Lives : ${lives}`;
      document.querySelector('#score').innerText = `level : ${level}`;
    }
    if (level === 3 && lives === 0) { //checking & setting levels
      level = 0;
      lives = 3;
    }
  }
  handleInput(keyCode) {
    if (keyCode === 'up' && this.y > 30) {
      this.y = this.y - 30;
    } else if (keyCode === 'left' && this.x > 10) {
      this.x = this.x - 30;
    } else if (keyCode === 'right' && this.x < 780) {
      this.x = this.x + 30;
    } else if (keyCode === 'down' && this.y < 410) {
      this.y = this.y + 30;
    }
  }
}

const sun = new Sun();
const player = new Player(410, 430);
const enemy1 = new Enemy(10, 5, 'rtl', 'enemy1');
const enemy2 = new Enemy(10, 100, 'rtl', 'enemy2');
const enemy3 = new Enemy(10, 150, 'rtl', 'enemy3');

const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

document.addEventListener('keyup', function (e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
  enemy3.update();
});
