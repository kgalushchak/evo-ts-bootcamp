import React from 'react';
import './App.css';
import Canvas from './Canvas';
import {useStore} from './GameStore';
import {useEventListener} from './utils/hooks';
import {Directions, Keys} from './Keys';
import {observer} from 'mobx-react-lite';

const App = observer(() => {
  const store = useStore('Game');

  const handler =
    (e: KeyboardEvent) => {
      if (!(Object.values(Keys) as string[]).includes(e.code)) {
        e.preventDefault();
        return false;
      }
      const selectedDirection = Directions.get(Keys[e.code as keyof typeof Keys])!;
      store.setDirection(selectedDirection);
    };

  useEventListener(handler);

  return (
    <div className="App">
      <Canvas draw={store.draw} id="game-canvas" height={store.HEIGHT.toString()} width={store.WIDTH.toString()}/>
    </div>
  );
});

export default App;
