class Chemical {
  constructor(name, color, amount = 0) {
    this.name = name;
    this.color = color;
    this.amount = amount;
  }
  getHeight() {
    return this.amount;
  }
}
const sketch = (p) => {
  let canvas;
  let testTubes = [];
  let selected_test_tube = null;
  class pObject {
    constructor(x, y) {
      this.id = Math.random().toString().slice(2);
      this.x = x;
      this.y = y;
    }
  }
  class pRect extends pObject {
    constructor(x, y, w, h) {
      super(x, y);
      this.w = w;
      this.h = h;
    }
    right() {
      return this.x + this.w;
    }
    left() {
      return this.x;
    }
    top() {
      return this.y;
    }
    bottom() {
      return this.y + this.h;
    }
  }
  let tWidth = 50;
  let tHeight = 500;
  class TestTube extends pRect {
    fill_color = p.color(10, 20);
    stroke_color = p.color(150);
    constructor(x = 0, y = 0, chemical = null) {
      super(x, y, tWidth, tHeight);
      this.width = tWidth;
      this.height = tHeight;
      this.chemical = chemical;
    }
    draw(p) {
      // test tube
      p.fill(this.fill_color);
      p.stroke(this.stroke_color);
      p.strokeWeight(4);
      p.rect(this.x, this.y, this.width, this.height, 0, 0, 40, 40);
      //lid line
      p.stroke(this.stroke_color);
      p.strokeWeight(10);
      p.line(this.x, this.y, this.x + this.width, this.y);
      p.strokeWeight(4);
      // chemical level
      if (!this.chemical) {
        return;
      }
      this.chemical.color.setAlpha(170);
      p.fill(this.chemical.color);
      p.noStroke();
      p.rect(
        this.x + 2,
        this.y + this.height - this.chemical.getHeight(),
        this.width - 4,
        this.chemical.getHeight() - 2,
        0,
        0,
        40,
        40
      );
      //name
      this.chemical.color.setAlpha(255);
      p.fill(this.chemical.color);
      p.textSize(16);
      p.textAlign(p.CENTER);
      p.text(
        this.chemical.name,
        this.x + this.width / 2,
        this.y + this.height + 30
      );
    }

    fill(chemical) {
      this.chemical = chemical;
    }
  }

  function rect_rect_collision(pRect1, pRect2) {
    if (
      pRect2.right() < pRect1.left() ||
      pRect1.right() < pRect2.left() ||
      pRect2.bottom() < pRect1.top() ||
      pRect1.bottom() < pRect2.top()
    ) {
      return false;
    }
    return true;
  }

  p.setup = async () => {
    canvas = p.select("#canvas");
    p.createCanvas(canvas.width, canvas.height);
    p.background(255);
    let chemicals = await p.loadJSON("./chemicals.json");
    console.log(chemicals);

    for (let i = 0; i < chemicals.length; i++) {
      const chemical = chemicals[i];
      let testTube = new TestTube(
        100 + i * 100,
        100,
        new Chemical(chemical.name, p.color(chemical.color), p.random(50, 400))
      );
      testTubes.push(testTube);
    }
  };
  p.windowResized = () => {
    canvas = p.select("#canvas");
    p.resizeCanvas(canvas.width, canvas.height);
  };
  p.draw = () => {
    p.background(255);
    for (let i = 0; i < testTubes.length; i++) {
      testTubes[i].draw(p);
    }
  };
  p.mousePressed = () => {
    let x = p.mouseX;
    let y = p.mouseY;

    let mouse = new pRect(x, y, 10, 10);
    for (let i = 0; i < testTubes.length; i++) {
      if (rect_rect_collision(testTubes[i], mouse)) {
        selected_test_tube = testTubes[i];
        break;
      }
    }
  };
  p.mouseDragged = () => {
    if (!selected_test_tube) {
      return;
    }
    selected_test_tube.x = p.mouseX - tWidth / 2;
    selected_test_tube.y = p.mouseY - tHeight / 2;
  };
};

export default sketch;
