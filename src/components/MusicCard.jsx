import React from 'react';
import propTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  async savefavorite(song) {
    this.setState({ loading: true });
    await addSong(song);
    this.setState({ loading: false });
    console.log(song);
  }

  render() {
    const { loading } = this.state;
    const { album } = this.props;
    return (
      <div>
        {loading ? <Carregando /> : (
          <div>
            {album.map(({ trackName, previewUrl, trackId }, index) => (
              <section key={ index }>
                {index > 0 && (
                  <>
                    <p>
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
                      {' '}
                      favorita
                      <input
                        name={ trackName }
                        data-testid={ `checkbox-music-${trackId}` }
                        type="checkbox"
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
