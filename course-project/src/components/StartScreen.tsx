import React from 'react';
import {observer} from 'mobx-react-lite';
import StartButton from './StartButton';
import apple from '../images/apple.svg';
import burger from '../images/burger.svg';
import energyDrink from '../images/energy-drink.svg';
import pill from '../images/pill.svg';
import snake from '../images/snake.svg';

const StartScreen: React.FC = observer(() => {
  return (
    <div id="game-container">
      <div id="game-status">
        <img src={snake} width="100rem"></img>
        <h3>Welcome to Snake Game!</h3>
        <h1> Game Rules</h1>
        <div id="game-rules">
          <p>
            <img src={apple} width="20px"></img>
            Eat fruits to grow
          </p>
          <p>
            <img src={burger} width="20px"></img>
            Fast food makes you grow faster
          </p>
          <p>
            <img src={energyDrink} width="20px"></img>
            Energy drinks increase your speed
          </p>
          <p>
            <img src={pill} width="20px"></img>
            Pills change your direction
          </p>
        </div>
        <p id="start-btn"><StartButton/></p>
      </div>
    </div>
  );
});

export default StartScreen;
