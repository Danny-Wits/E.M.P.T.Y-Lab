import p5 from "p5";
import { useEffect, useRef } from "react";
import sketch from "./sketch";

function P5WrapperComponent() {
  const canvasRef = useRef(null);
  useEffect(() => {
    let p5Instance = new p5(sketch, canvasRef.current, true);
    return () => {
      p5Instance.remove();
    };
  }, []);
  return <div id="canvas" ref={canvasRef}></div>;
}

export default P5WrapperComponent;
