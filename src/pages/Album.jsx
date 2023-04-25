import React from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import musicsApi from '../services/musicsAPI';

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

  async getAlbum() {
    const { match: { params: { id } } } = this.props;
    const musicas = await musicsApi(id);
    console.log('lfsdf', musicas);
    this.setState({ album: musicas });
    const { album } = this.state;
    console.log('novo', album);
    this.addNameAndAlbum(album[1]);
  }

  addNameAndAlbum(param) {
    if (param) {
      const { artistName, collectionCensoredName, artworkUrl30 } = param;
      this.setState({
        artistNames: artistName,
        albumName: collectionCensoredName,
        image: artworkUrl30,
      });
    }
  }

  render() {
    const { album, artistNames, albumName, image } = this.state;
    const newAlbum = album.shift();
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <MusicCard
            artistNames={ artistNames }
            albumName={ albumName }
            newAlbums={ newAlbum }
            album={ album }
            image={ image }
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
