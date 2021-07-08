import React from 'react';
import {observer} from 'mobx-react-lite';
import StartButton from './StartButton';

const StartScreen: React.FC = observer(() => {
  return (
    <div id="game-status-container">
      <div id="game-status">
        <p id="start-btn"><StartButton/></p>
      </div>
    </div>
  );
});

export default StartScreen;
