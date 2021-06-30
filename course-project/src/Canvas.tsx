import React, {useEffect, useRef} from 'react';
import {observer} from 'mobx-react-lite';

interface CanvasProps {
  id: string,
  height: string,
  width:string,
  draw: (context: CanvasRenderingContext2D) => void
}

const Canvas = observer((props: CanvasProps) => {
  const canvasRef = useRef(null);
  const { draw, ...rest } = props;

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    draw(context);
  }, [draw]);

  return (<canvas ref={canvasRef} {...rest}/>);
});

export default Canvas;
