import React from 'react';
import {observer} from 'mobx-react-lite';
import './App.css';
import {useStore } from './GameStore';
import {useEventListener} from './utils/hooks';
import {Directions, Keys} from './Keys';
import GameContainer from './components/GameContainer';

const App = observer(() => {
  const {setDirection} = useStore('Game');

  const handler =
    (e: KeyboardEvent) => {
      if (!(Object.values(Keys) as string[]).includes(e.code)) {
        e.preventDefault();
        return;
      }
      const selectedDirection = Directions.get(Keys[e.code as keyof typeof Keys])!;
      setDirection(selectedDirection);
    };

  useEventListener(handler);

  return (
    <div className="App">
      <GameContainer/>
    </div>
  );
});

export default App;
