import {Food, FoodTemplate, FoodType} from './types';
import apple from './images/apple.svg';
import banana from './images/banana.svg';
import avocado from './images/avocado.svg';
import watermelon from './images/watermelon.svg';
import grape from './images/grape.svg';
import pill from './images/pill.svg';
import pill2 from './images/pill2.svg';
import energyDrink from './images/energy-drink.svg';
import burger from './images/burger.svg';

export const food: FoodTemplate[] = [
  {
    imgSrc: apple,
    type: FoodType.FRUIT
  },
  {
    imgSrc: banana,
    type: FoodType.FRUIT
  },
  {
    imgSrc: avocado,
    type: FoodType.FRUIT
  },
  {
    imgSrc: watermelon,
    type: FoodType.FRUIT
  },
  {
    imgSrc: grape,
    type: FoodType.FRUIT
  },
  {
    imgSrc: pill,
    type: FoodType.DRUG
  },
  {
    imgSrc: pill2,
    type: FoodType.DRUG
  },
  {
    imgSrc: energyDrink,
    type: FoodType.ENERGY_DRINK
  },
  {
    imgSrc: burger,
    type: FoodType.FAST_FOOD
  }
];
