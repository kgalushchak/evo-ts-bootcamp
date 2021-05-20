import React, {useState} from 'react';
import { Photos } from './features/photos/Photos';
import { Gallery } from './features/photos/Gallery';
import { useAppSelector } from './app/hooks';
import { selectFavourites } from './features/photos/photosSlice';
import './App.css';

function App() {
  const TAB_PHOTOS = 'Photos';
  const TAB_FAVOURITES = 'Favourites';
  const [selectedTab, setSelectedTab] = useState(TAB_PHOTOS);
  const favourites = useAppSelector(selectFavourites);

  let tab;
  if (selectedTab === TAB_FAVOURITES) {
    tab = <Gallery photos={favourites}/>;
  } else tab = <Photos />;

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <span onClick={() => setSelectedTab(TAB_PHOTOS)} className={selectedTab === TAB_PHOTOS ? 'selected-tab' : 'tab'}>{TAB_PHOTOS}</span>
          <span onClick={() => setSelectedTab(TAB_FAVOURITES)} className={selectedTab === TAB_FAVOURITES ? 'selected-tab' : 'tab'}>{TAB_FAVOURITES}</span>
        </div>
        {tab}
      </header>
    </div>
  );
}

export default App;
