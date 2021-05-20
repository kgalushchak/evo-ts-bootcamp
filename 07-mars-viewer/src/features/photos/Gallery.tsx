import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { GalleryProps, selectFavourites } from './photosSlice';
import { manageFavourites } from './photosSlice';
import './Gallery.css';

export const Gallery: React.FC<GalleryProps> = ({photos}) => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(selectFavourites);

  const gallery = photos.map((photo) => {
    const markedAsFavourite = photo.isFavourite || favourites.find(x => x.id === photo.id);
    return (<div key={photo.id} className="tooltip">
      <img
        src={photo.img_src}
        onClick={() => dispatch(manageFavourites(photo))}
        className={markedAsFavourite ? 'favourite' : ''}
      />
      <span className="tooltiptext">{!markedAsFavourite ? 'Click to add to favourites' : 'Click to remove from favourites'}</span>
    </div>);
  });
  return <section>{gallery}</section>;
};
