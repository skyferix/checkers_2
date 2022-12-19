import './App.css';
import Board from './components/board/Board';
import { GameManager } from './game-driver/GameManager';

function App() {
  const gameManager = new GameManager();
  gameManager.initialize();
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
