import React, {useEffect, useRef} from 'react';
import {observer} from 'mobx-react-lite';
import {useStore} from './GameStore';

interface CanvasProps {
  id: string,
  height: string,
  width:string,
  draw: (context: CanvasRenderingContext2D) => void
}

const Canvas = observer((props: CanvasProps) => {
  const {move} = useStore('Game');
  const canvasRef = useRef(null);
  const { draw, ...rest } = props;

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    draw(context);

    const intervalId = setInterval(() => {
      move(context);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [draw]);

  return (<canvas ref={canvasRef} {...rest}/>);
});

export default Canvas;
