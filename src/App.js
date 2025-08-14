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
import Subscription from './pages/Subscription';

class App extends React.Component {
  render() {
    return (
      <div className="flex">
        <Sidebar /> 
        <main className="flex-1 p-4 h-screen bg-zinc-900">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/album/:id" component={Album} />
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/carregando" component={Carregando} />
            <Route exact path="/profile/:edit" component={ProfileEdit} />
            <Route exact path="/subscription" component={Subscription} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
