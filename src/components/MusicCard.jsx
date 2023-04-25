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
    const { album, artistNames, albumName, image } = this.props;
    return (
      <div>
        <img src={ image } alt="" />
        <h1 data-testid="artist-name">{artistNames}</h1>
        <div data-testid="album-name">{albumName}</div>
        {album.map(({ trackName, previewUrl }, index) => (
          <section key={ index }>
            <div>{trackName}</div>
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
              // checked={ checked }
            />
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
  albumName: propTypes.string.isRequired,
  artistNames: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
};
