import React from 'react';
import { GalleryProps, useStore } from './store';
import './Gallery.css';
import {observer} from 'mobx-react-lite';

export const Gallery: React.FC<GalleryProps> = observer(({photos}) => {
  const store = useStore('Photos');

  const gallery = photos.map((photo) => {
    const markedAsFavourite = photo.isFavourite || store.favourites.find(x => x.id === photo.id);
    return (<div key={photo.id} className="tooltip">
      <img
        src={photo.img_src}
        onClick={() => store.toggleFavourites(photo)}
        className={markedAsFavourite ? 'favourite' : ''}
      />
      <span className="tooltiptext">{!markedAsFavourite ? 'Click to add to favourites' : 'Click to remove from favourites'}</span>
    </div>);
  });
  return <section>{gallery}</section>;
});
