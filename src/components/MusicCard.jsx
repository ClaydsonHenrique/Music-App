import React from 'react';
import propTypes from 'prop-types';
import { FaHeart } from 'react-icons/fa';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteTrackIDs: [],
    };
  }

  async componentDidMount() {
    const favoriteList = await getFavoriteSongs();
    const listIds = favoriteList.map((item) => item.trackId);
    this.setState({ favoriteTrackIDs: listIds });
  }

  async savefavorite(song) {
    this.setState({ loading: true });
    let { favoriteTrackIDs } = this.state;
    if (favoriteTrackIDs.includes(song.trackId)) {
      const removeItem = favoriteTrackIDs.filter((item) => item !== song.trackId);
      favoriteTrackIDs = removeItem;
      await removeSong(song);
    } else {
      favoriteTrackIDs.push(song.trackId);
      await addSong(song);
    }
    this.setState({
      loading: false,
      favoriteTrackIDs,
    });
  }

  // async isMusicFavorite(song) {
  //   const favoriteList = await getFavoriteSongs();
  //   const found = favoriteList.find((item) => item.trackId === song.trackId);
  //   if (found) {
  //     return true;
  //   }
  // }

  render() {
    const { loading, favoriteTrackIDs } = this.state;
    const { album } = this.props;
    return (
      <div>
        {loading ? <Carregando /> : (
          <div>
            {album.map(({ trackName, previewUrl, trackId }, index) => (
              <section key={ index } className="muscis">
                {index > 0 && (
                  <>
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
                      {/* {this.isMusicFavorite(album[index])} */}
                      <FaHeart style={ { color: 'red' } } />
                      <input
                        checked={ favoriteTrackIDs.includes(trackId) }
                        name={ trackName }
                        data-testid={ `checkbox-music-${trackId}` }
                        type="checkbox"
                        style={ { display: 'none' } }
                        onChange={ () => this.savefavorite(album[index]) }
                      />
                    </label>
                  </>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default MusicCard;

MusicCard.propTypes = {
  album: propTypes.arrayOf(
    propTypes.shape({
      trackName: propTypes.string,
      previewUrl: propTypes.string,
    }),
  ).isRequired,
};
