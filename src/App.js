import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProfileEdit from './pages/ProfileEdit';

class App extends React.Component {
  render() {
    return (
      <>
        <p>TrybeTunes</p>
        <div>
          <Switch>
            <Route exact component={ Login } path="/" />
            <Route exact component={ Search } path="/Search" />
            <Route exact component={ Album } path="/Album/:id" />
            <Route exact component={ Favorites } path="/Favorites" />
            <Route exact component={ Profile } path="/Profile" />
            <Route exact component={ ProfileEdit } path="/Profile/:edit" />
            <Route component={ NotFound } path="*" />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
