import './App.css';
import { useSelector} from 'react-redux'
import GameScreen from './components/GameScreen';
import StartPage from './components/StartPage';

function App() {
  const gameStatus = useSelector((state) => state.gameData.gameStatus)
  return (
    <div className="App">
      {gameStatus === 'start' ? <StartPage/> : <GameScreen />}
    </div>
  );
}

export default App;