import './index.css';
import {countScore, moveHand, renderGrid, showCat} from './renderer';
import {animationFrameScheduler, fromEvent, interval} from 'rxjs';
import {tap} from 'rxjs/operators';

renderGrid();

const cat$ = interval(1000, animationFrameScheduler)
  .pipe(
    tap(showCat)
  );

const hand$ = fromEvent(document, 'mousemove');
const click$ = fromEvent(document, 'click');

cat$.subscribe();
hand$.subscribe(moveHand);
click$.subscribe(countScore);
