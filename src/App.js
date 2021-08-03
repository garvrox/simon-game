import "./style/App.scss";
import SimonGame from "./components/SimonGame";
import SimonRule from "./components/SimonRule";

function App() {
  return (
    <div className="game-container">
      <h1>Simon Game</h1>
      <SimonGame />
      <h2>Rules: </h2>
      <SimonRule />
    </div>
  );
}

export default App;
