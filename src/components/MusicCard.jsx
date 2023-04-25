import React from 'react';
import propTypes from 'prop-types';
// import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      // checked: false,
    };
  }

  // savefavorite(param) {
  //   addSong(param);
  // }

  render() {
    // const { checked } = this.state;
    const { album } = this.props;
    return (
      <div>
        {album.map(({ trackName, previewUrl }, index) => (
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
                <input
                  type="checkbox"
                  onChange={ this.savefavorite }
                />
              </>
            )}
          </section>
        ))}
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
