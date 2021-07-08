import React from 'react';
import {observer} from 'mobx-react-lite';
import {useStore} from '../GameStore';

const StartButton = observer(() => {
  const {resetGame} = useStore('Game');

  return <button onClick={() => resetGame()}>Click to start</button>; //TODO make it work

});

export default StartButton;
