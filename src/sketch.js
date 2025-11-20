const sketch = (p) => {
  let diameter = 50;
  let canvas;
  p.setup = () => {
    canvas = p.select("#canvas");
    p.createCanvas(canvas.width, canvas.height);
    p.background(255);
  };
  p.windowResized = () => {
    canvas = p.select("#canvas");
    p.resizeCanvas(canvas.width, canvas.height);
    console.log("Resized", canvas.width, canvas.height);
  };
  p.draw = () => {
    // p.background(255);
    p.fill(255, 0, 100, 10);
    p.noStroke();
    p.ellipse(p.mouseX, p.mouseY, diameter, diameter);
  };

  p.mousePressed = () => {
    diameter = diameter === 50 ? 80 : 50;
  };
};

export default sketch;
