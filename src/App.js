import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProfileEdit from './pages/ProfileEdit';
import Carregando from './components/Carregando';
import Sidebar from './components/Sidebar';

class App extends React.Component {
  render() {
    return (
      <section className="page">
        <div>
          <Switch>
            <Route exact component={ Sidebar }>
              <Route exact component={ Login } path="/Music-App" />
              <Route exact component={ Search } path="/Search" />
              <Route exact component={ Album } path="/Album/:id" />
              <Route exact component={ Favorites } path="/Favorites" />
              <Route exact component={ Profile } path="/Profile" />
              <Route exact component={ Carregando } path="/carregando" />
              <Route exact component={ ProfileEdit } path="/Profile/:edit" />
            </Route>
            <Route component={ NotFound } path="*" />
          </Switch>
        </div>
      </section>
    );
  }
}

export default App;
