import "./App.css";
import P5WrapperComponent from "./P5WrapperComponent";

function App() {
  return (
    <div className="App">
      <div className="tools-section">
        <h2>Tools</h2>
      </div>
      <div className="canvas-section">
        <P5WrapperComponent />
      </div>
      <div className="chemicals-section">
        <h2>Chemicals</h2>
      </div>
    </div>
  );
}

export default App;
