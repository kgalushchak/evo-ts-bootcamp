import {action, makeAutoObservable, runInAction} from 'mobx';
import {createContext} from './utils/storeUtils';
import {getMarsPhotos} from './utils/marsPhotos';

export interface PhotoProps {
  id: string,
  img_src: string,
  isFavourite?: boolean
}

export interface GalleryProps {
  photos: PhotoProps[];
}

export enum tab {
  TAB_PHOTOS = 'Photos',
  TAB_FAVOURITES = 'Favourites'
}

class Photos {
  activeTab: tab = tab.TAB_PHOTOS;
  sol = '1';
  photos: PhotoProps[] = [];
  favourites: PhotoProps[] = [];

  constructor() {
    makeAutoObservable(this, {
      getPhotos: action.bound,
      setActiveTab: action.bound,
      setSol: action.bound,
      toggleFavourites: action.bound
    });
  }

  async getPhotos(sol: number) {
    const data = await getMarsPhotos(sol);
    runInAction(() => (this.photos = data));
  }

  setActiveTab(tab: tab) {
    this.activeTab = tab;
  }

  setSol(sol: string) {
    this.sol = sol;
  }

  toggleFavourites(photo: PhotoProps) {
    const photoIndex = this.photos.findIndex(x => x.id === photo.id);
    if (!this.favourites.find(x => x === photo)) {
      this.favourites.push(photo);
      this.photos.splice(photoIndex, 1, {id: photo.id, img_src: photo.img_src, isFavourite: true});
    } else {
      const favIndex = this.favourites.findIndex(x => x.id === photo.id);
      this.favourites.splice(favIndex, 1);
      this.photos.splice(photoIndex, 1, {id: photo.id, img_src: photo.img_src, isFavourite: false});
    }
  }
}

export const { StoreProvider, useStore } = createContext({
  Photos: new Photos()
});
