import React from 'react';
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
      <div className="flex">
        <Sidebar /> 
        <main className="flex-1 p-4 bg-gray-100">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/Search" component={Search} />
            <Route exact path="/Album/:id" component={Album} />
            <Route exact path="/Favorites" component={Favorites} />
            <Route exact path="/Profile" component={Profile} />
            <Route exact path="/carregando" component={Carregando} />
            <Route exact path="/Profile/:edit" component={ProfileEdit} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
