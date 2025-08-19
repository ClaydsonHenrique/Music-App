import React from 'react';
import propTypes from 'prop-types';
import { FaHeart } from 'react-icons/fa';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import MusicContext from '../context/MusicContext';

function MusicCard({ album }) {


  const [loading, setLoading] = React.useState(false);
  const [favoriteTrackIDs, setFavoriteTrackIDs] = React.useState([]);

  const { music, setMusic } = React.useContext(MusicContext);


  const savefavorite = async (song) => {
    if (favoriteTrackIDs.includes(song.trackId)) {
      const removeItem = favoriteTrackIDs.filter((item) => item !== song.trackId);
      setFavoriteTrackIDs(removeItem);
      await removeSong(song);
    } else {
      favoriteTrackIDs.push(song.trackId);
      await addSong(song);
    }

    setLoading(false);
    setFavoriteTrackIDs(favoriteTrackIDs);

  }
  
    const addFavorite = async () => {
    const favoriteList = await getFavoriteSongs();
    const listIds = favoriteList.map((item) => item.trackId);
    setFavoriteTrackIDs(listIds);
  }


    React.useEffect(() => {
    addFavorite();
  }, []);
  
  return (
    <div>
      {loading ? <Carregando /> : (
        <div >
          {album.map(({ trackName, previewUrl, trackId }, index) => {
            if (!previewUrl) return null;
            return (
              <section key={index} className="flex items-center gap-4 bg-white/5 p-3 rounded-lg hover:bg-white/10 cursor-pointer"
                onClick={() => setMusic(album[index])}
              >

                <p className=" text-gray-400 ">
                  {' '}
                  {trackName}
                  {' '}
                </p>
                <label>
                  <FaHeart
                  onClick={() => savefavorite(album[index])}
                    style={{
                      color: `${favoriteTrackIDs.includes(trackId)
                        ? 'red' : 'grey'}`
                    }}
                  />
                  <input
                    checked={favoriteTrackIDs.includes(trackId)}
                    name={trackName}
                    data-testid={`checkbox-music-${trackId}`}
                    type="checkbox"
                    style={{ display: 'none' }}
                    onChange={() => savefavorite(album[index])}
                  />
                </label>
              </section>
            )
          })}
        </div>
      )}
    </div>
  );
}


export default MusicCard;

