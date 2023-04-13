import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <>
        <p>TrybeTunes</p>
        <BrowserRouter>
          <Route component={ Login } path="/" exact />
          <Route component={ Search } path="/Search" />
          <Route component={ Album } path="/Album" />
          <Route component={ Favorites } path="/Favorites" />
          <Route component={ Profile } path="/Profile" />
          <Route component={ NotFound } path="/*" />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
