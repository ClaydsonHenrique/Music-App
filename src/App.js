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
import MusicPlayer from './components/MusicPlayer';
import MusicContext from './context/MusicContext';

function App() {
  const [music, setMusic] = React.useState([]);
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 bg-zinc-900">
        <MusicContext.Provider value={{ music, setMusic }}>
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
        </MusicContext.Provider>
        {
          music && music.previewUrl && (
            <MusicPlayer music={music} />
          )
        }
      </div>
    </main>
  );
}

export default App;
