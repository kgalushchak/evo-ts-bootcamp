import {observer} from 'mobx-react-lite';
import {useStore} from '../GameStore';

const Score = observer(() => {
  const {score, highScore} = useStore('Game');

  return (<div id="score-container">
    <div>
      <h3>Current Score</h3>
      <p>{score}</p>
    </div>
    <div>
      <h3>High Score</h3>
      <p>{highScore}</p>
    </div>
  </div>);
});

export default Score;
