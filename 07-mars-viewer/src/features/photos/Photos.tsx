import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getPhotos,  getSol, setSol, selectPhotos } from './photosSlice';
import styles from './Photos.module.css';
import {Gallery} from './Gallery';

export function Photos() {
  const photos = useAppSelector(selectPhotos);
  const sol = useAppSelector(getSol);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Enter sol value"
          value={sol}
          onChange={(e) => dispatch(setSol(e.target.value))}
        />
        <button
          className={styles.button}
          aria-label="Get photos for sol"
          onClick={() => dispatch(getPhotos(Number(sol)))}
        >
          Select sol
        </button>
      </div>
      <Gallery photos={photos}/>
    </div>
  );
}
