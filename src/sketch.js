class Chemical {
  constructor(name, color, amount = 0) {
    this.name = name;
    this.color = color;
    this.textColor = color;
    color.setAlpha(120);
    this.liquidColor = color;
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
      p.fill(this.chemical.liquidColor);
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
      p.fill(this.chemical.textColor);
      p.textSize(20);
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

  p.setup = () => {
    canvas = p.select("#canvas");
    p.createCanvas(canvas.width, canvas.height);
    p.background(255);
    let t = new TestTube(
      10,
      50,
      new Chemical("water", p.color(0, 50, 255), 100)
    );
    let t1 = new TestTube(
      100,
      50,
      new Chemical("hcl", p.color(255, 0, 0), 200)
    );
    let t2 = new TestTube(
      200,
      50,
      new Chemical("nacl", p.color(150, 150, 200), 180)
    );
    testTubes.push(t);
    testTubes.push(t1);
    testTubes.push(t2);
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
    selected_test_tube.x = p.mouseX - tWidth / 2;
    selected_test_tube.y = p.mouseY - tHeight / 2;
  };
};

export default sketch;
