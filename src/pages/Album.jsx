import React from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      album: [],
      artistNames: '',
      albumName: '',
      image: '',
    };
  }

  componentDidMount() {
    this.getAlbum();
  }

  componentDidUpdate(_prevProps, prevState) {
    console.log('did upedate', prevState);
  }

  async getAlbum() {
    const { match: { params: { id } } } = this.props;
    const musicas = await getMusics(id);
    const { artistName } = musicas[0];
    const { collectionName } = musicas[0];
    const { artworkUrl60 } = musicas[0];
    this.setState({ album: musicas,
      artistNames: artistName,
      albumName: collectionName,
      image: artworkUrl60 });
    const { album } = this.state;
    console.log(album);
  }

  render() {
    const { album, artistNames, albumName, image } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <img src={ image } alt="" />
          <h1 data-testid="artist-name">{artistNames}</h1>
          <h1 data-testid="album-name">
            {albumName}
            {artistNames}
          </h1>
          <MusicCard
            album={ album }
          />
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(Album);
