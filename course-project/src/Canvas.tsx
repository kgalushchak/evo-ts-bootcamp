import React, {CSSProperties, useEffect, useRef} from 'react';
import {observer} from 'mobx-react-lite';
import {useStore} from './GameStore';
import {GameStatus} from './types';

interface CanvasProps {
  id: string,
  height: string,
  width:string,
  draw: (context: CanvasRenderingContext2D) => void
}

const Canvas = observer((props: CanvasProps) => {
  const {move, moveTimeout, gameStatus} = useStore('Game');
  const canvasRef = useRef(null);
  const { draw, ...rest } = props;

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    draw(context);

    const intervalId = setInterval(() => {
      if (gameStatus === GameStatus.ACTIVE) {
        move(context);
      }
    }, moveTimeout);
    return () => clearInterval(intervalId);
  }, [draw, gameStatus, moveTimeout]);

  if (gameStatus !== GameStatus.ENDED) {
    const style: CSSProperties = {
      lineHeight: props.height,
    };
    return <canvas ref={canvasRef} style={style} {...rest}/>;
  } else {
    return <div id="game-status">Game Over!</div>;
  }
});

export default Canvas;
