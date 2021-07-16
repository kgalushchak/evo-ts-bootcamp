import React from 'react';
import {observer} from 'mobx-react-lite';
import Canvas from './Canvas';
import Score from './Score';
import {HEIGHT, WIDTH, useStore} from '../GameStore';

const GameScreen = observer(() => {
  const {draw} = useStore('Game');

  return (
    <div id="game-container">
      <div id="game-status">
        <Canvas draw={draw} id="game-canvas" height={HEIGHT.toString()} width={WIDTH.toString()}/>
        <Score/>
      </div>
    </div>
  );
});

export default GameScreen;
