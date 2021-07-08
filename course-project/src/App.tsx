import React from 'react';
import './App.css';
import Canvas from './components/Canvas';
import {useStore} from './GameStore';
import {useEventListener} from './utils/hooks';
import {Directions, Keys} from './Keys';
import {observer} from 'mobx-react-lite';

const App = observer(() => {
  const {draw, HEIGHT, WIDTH, setDirection} = useStore('Game');

  const handler =
    (e: KeyboardEvent) => {
      if (!(Object.values(Keys) as string[]).includes(e.code)) {
        e.preventDefault();
        return false;
      }
      const selectedDirection = Directions.get(Keys[e.code as keyof typeof Keys])!;
      setDirection(selectedDirection);
    };

  useEventListener(handler);

  return (
    <div className="App">
      <Canvas draw={draw} id="game-canvas" height={HEIGHT.toString()} width={WIDTH.toString()}/>
    </div>
  );
});

export default App;
