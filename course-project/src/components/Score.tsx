import {observer} from 'mobx-react-lite';
import {useStore} from '../GameStore';

const Score = observer(() => {
  const {score, highScore, highScoreHit} = useStore('Game');

  return (<div id="score-container">
    <div>
      <h3>Current Score</h3>
      <p>{score}</p>
    </div>
    <div>
      <h3>High Score</h3>
      <div className={highScoreHit ? 'box' : ''}>
        <span className="span-1"></span>
        <span className="span-2"></span>
        <span className="span-3"></span>
        <span className="span-4"></span>
        <p>{highScore}</p>
      </div>
    </div>
  </div>);
});

export default Score;
