import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicContext from '../context/MusicContext';

function Favorites () {
  const { music, setMusic } = React.useContext(MusicContext);
  const [ favoriteTrackIDs, setFavoriteTrackIDs ] = React.useState([]);
  const [ loading, setLoading ] = React.useState(false);
  
  const getFavorites = async () => {
    setLoading(true);
    const favoriteList = await getFavoriteSongs();
    const listIds = favoriteList.map((item) => item);
    setFavoriteTrackIDs(listIds);
    setLoading(false);
  };
  
  
  React.useEffect(() => {
    getFavorites();
  }, []);
  
  

  const savefavorite = async (song) => {
    await removeSong(song);
    const favoriteList = await getFavoriteSongs();
    const listIds = favoriteList.map((item) => item);
    setFavoriteTrackIDs(listIds);
  }
  
  console.log(favoriteTrackIDs);
  
    return (
      <main className=" " >
        <div className="text-white text-center p-4">
          <h1>Musicas favoritas</h1>
        </div>
        <div className="page-album" >
          {loading ? '/>' : (
            <div>
              {favoriteTrackIDs.map(({ trackName, previewUrl, trackId }, index) => (
                <section key={index} className="flex items-center gap-4 bg-white/5 p-3 rounded-lg hover:bg-white/10 cursor-pointer"
                  onClick={() => setMusic(favoriteTrackIDs[index])}
                >
                  <p className=" text-gray-400">
                    {' '}
                    {trackName}
                    {' '}
                  </p>
                  <label>
                    <FaHeart
                      style={ {
                        color: 'red',
                        cursor: 'pointer',
                      } }
                    />
                    <input
                      checked={ favoriteTrackIDs.includes(trackId) }
                      name={ trackName }
                      data-testid={ `checkbox-music-${trackId}` }
                      type="checkbox"
                      style={ { display: 'none' } }
                      onChange={ () => savefavorite(favoriteTrackIDs[index]) }
                    />
                  </label>
                </section>
              ))}
            </div>
          )}
        </div>

      </main>

    );
  }

export default Favorites;
