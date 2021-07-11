import {useEffect, useRef} from 'react';

export const useEventListener = (handler: any) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      //@ts-ignore //TODO remove
      const eventListener = (event: KeyboardEvent) => savedHandler.current(event);
      window.addEventListener('keydown', eventListener);

      return () => {
        window.removeEventListener('keydown', eventListener);
      };
    },
    []
  );
};
