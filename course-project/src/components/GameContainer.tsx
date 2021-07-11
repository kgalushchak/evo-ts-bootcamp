import React from 'react';
import {observer} from 'mobx-react-lite';
import {GameStatus} from '../types';
import GameOverScreen from './GameOverScreen';
import StartScreen from './StartScreen';
import GameScreen from './GameScreen';
import {useStore} from '../GameStore';

const GameContainer = observer(() => {
  const {gameStatus} = useStore('Game');

  if (gameStatus === GameStatus.ACTIVE) {
    return <GameScreen/>;
  } else if (gameStatus === GameStatus.ENDED) {
    return <GameOverScreen/>;
  } else {
    return <StartScreen/>;
  }
});

export default GameContainer;
