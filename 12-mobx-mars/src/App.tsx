import React from 'react';
import './App.css';
import {observer} from 'mobx-react-lite';
import {tab, useStore} from './store';
import {Gallery} from './Gallery';
import {Photos} from './Photos';

const App = observer(() => {
  const store = useStore('Photos');

  let selectedTab;
  if (store.activeTab === tab.TAB_FAVOURITES) {
    selectedTab = <Gallery photos={store.favourites}/>;
  } else selectedTab = <Photos />;


  return (
    <div className="App">
      <header className="App-header">
        <div>
          <span onClick={() => store.setActiveTab(tab.TAB_PHOTOS)} className={store.activeTab === tab.TAB_PHOTOS ? 'selected-tab' : 'tab'}>{tab.TAB_PHOTOS}</span>
          <span onClick={() => store.setActiveTab(tab.TAB_FAVOURITES)} className={store.activeTab === tab.TAB_FAVOURITES ? 'selected-tab' : 'tab'}>{tab.TAB_FAVOURITES}</span>
        </div>
        {selectedTab}
      </header>
    </div>
  );
});

export default App;
