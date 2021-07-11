import React from 'react';
import {observer} from 'mobx-react-lite';
import StartButton from './StartButton';
import Score from './Score';

const GameOverScreen: React.FC = observer(() => {
  return (
    <div id="game-container">
      <div id="game-status">
        <p id="status-text">Game Over!</p>
        <Score/>
        <p id="start-btn"><StartButton/></p>
      </div>
    </div>
  );
});

export default GameOverScreen;
