import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getMarsPhotos } from '../../utils/marsPhotos';

export interface PhotoProps {
  id: string,
  img_src: string,
  isFavourite?: boolean
}

export interface GalleryProps {
  photos: PhotoProps[];
}

export interface PhotosState {
  sol: string;
  photos: PhotoProps[];
  favourites: PhotoProps[];
}

const initialState: PhotosState = {
  sol: '1',
  photos: [],
  favourites: []
};

export const getPhotos = createAsyncThunk(
  'photos/getMarsPhotos',
  async (sol: number) => {
    const response = await getMarsPhotos(sol);
    return response;
  }
);

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    toggleFavourites: (state, action: PayloadAction<PhotoProps>) => {
      const photoIndex = state.photos.findIndex(x => x.id ===action.payload.id);
      if (!state.favourites.find(x => x.id === action.payload.id)) {
        state.favourites.push(action.payload);
        state.photos.splice(photoIndex, 1, { id: action.payload.id, img_src: action.payload.img_src, isFavourite: true});
      } else {
        const favIndex = state.favourites.findIndex(x => x.id === action.payload.id);
        state.favourites.splice(favIndex, 1);
        state.photos.splice(photoIndex, 1, { id: action.payload.id, img_src: action.payload.img_src, isFavourite: false});
      }
    },
    setSol:(state, action: PayloadAction<string>) => {
      state.sol = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPhotos.fulfilled, (state, action) => {
        state.photos = action.payload;
      });
  },
});

export const { toggleFavourites, setSol } = photosSlice.actions;

export const selectPhotos = (state: RootState) => state.photos.photos;

export const selectFavourites = (state: RootState) => state.photos.favourites;

export const selectSol = (state: RootState) => state.photos.sol;

export default photosSlice.reducer;
