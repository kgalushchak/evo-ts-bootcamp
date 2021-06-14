import React from 'react';
import styles from './Photos.module.css';
import {Gallery} from './Gallery';
import {useStore} from './store';
import {observer} from 'mobx-react-lite';

export const Photos: React.FC = observer(() => {
  const store = useStore('Photos');

  return (
    <div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Enter sol value"
          value={store.sol}
          onChange={(e) => store.setSol(e.target.value)}
        />
        <button
          className={styles.button}
          aria-label="Get photos for sol"
          onClick={() => store.getPhotos(Number(store.sol))}
        >
          Select sol
        </button>
      </div>
      <Gallery photos={store.photos}/>
    </div>
  );
});
