import React from 'react';
import propTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { album, artistNames, albumName } = this.props;
    return (
      <div>
        <div>{artistNames}</div>
        <div>{albumName}</div>
        {album.map(({ trackName, previewUrl }, index) => (
          <section key={ index }>
            <div>{trackName}</div>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>

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
      trackName: propTypes.string.isRequired,
      previewUrl: propTypes.string.isRequired,
    }),
  ).isRequired,
  albumName: propTypes.string.isRequired,
  artistNames: propTypes.string.isRequired,
};
