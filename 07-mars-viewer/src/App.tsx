import React, {useState} from 'react';
import { Photos } from './features/photos/Photos';
import { Gallery } from './features/photos/Gallery';
import { useAppSelector } from './app/hooks';
import { selectFavourites } from './features/photos/photosSlice';
import './App.css';

enum tab {
  TAB_PHOTOS = 'Photos',
  TAB_FAVOURITES = 'Favourites'
}

function App() {
  const [selectedTab, setSelectedTab] = useState(tab.TAB_PHOTOS);
  const favourites = useAppSelector(selectFavourites);

  let activeTab;
  if (selectedTab === tab.TAB_FAVOURITES) {
    activeTab = <Gallery photos={favourites}/>;
  } else activeTab = <Photos />;

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <span onClick={() => setSelectedTab(tab.TAB_PHOTOS)} className={selectedTab === tab.TAB_PHOTOS ? 'selected-tab' : 'tab'}>{tab.TAB_PHOTOS}</span>
          <span onClick={() => setSelectedTab(tab.TAB_FAVOURITES)} className={selectedTab === tab.TAB_FAVOURITES ? 'selected-tab' : 'tab'}>{tab.TAB_FAVOURITES}</span>
        </div>
        {activeTab}
      </header>
    </div>
  );
}

export default App;
