import React from 'react';
import { FaHeart } from 'react-icons/fa';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteTrackIDs: [],
    };
  }

  async componentDidMount() {
    const favoriteList = await getFavoriteSongs();
    const listIds = favoriteList.map((item) => item);
    this.setState({ favoriteTrackIDs: listIds });
  }

  async savefavorite(song) {
    await removeSong(song);
    const favoriteList = await getFavoriteSongs();
    const listIds = favoriteList.map((item) => item);
    this.setState({ favoriteTrackIDs: listIds });
  }

  render() {
    const { favoriteTrackIDs, loading } = this.state;
    console.log(favoriteTrackIDs);
    return (
      <main className="containerAlbum " style={ { height: '100vh' } }>
        <Header />
        <div className="imgBg">
          <h1>Musicas favoritas</h1>
        </div>
        <div className="page-album" style={ { marginTop: '16rem' } }>
          {loading ? '/>' : (
            <div>
              {favoriteTrackIDs.map(({ trackName, previewUrl, trackId }, index) => (
                <section key={ index } className="muscis">
                  <p className="trackname">
                    {' '}
                    {trackName}
                    {' '}
                  </p>
                  <audio data-testid="audio-component" src={ previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
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
                      onChange={ () => this.savefavorite(favoriteTrackIDs[index]) }
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
}

export default Favorites;
