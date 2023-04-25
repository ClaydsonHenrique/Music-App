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
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getAlbum(id);
  }

  async getAlbum(id) {
    const musicas = await musicsApi(id);
    this.setState({ album: musicas });
    const { album } = this.state;
    this.addNameAndAlbum(album[1]);
  }

  addNameAndAlbum(param) {
    if (param) {
      const { artistName, collectionCensoredName } = param;
      this.setState({
        artistNames: artistName,
        albumName: collectionCensoredName,
      });
    }
  }

  render() {
    const { album, artistNames, albumName } = this.state;
    const newAlbum = album.shift();
    console.log(album);
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <MusicCard
            artistNames={ artistNames }
            albumName={ albumName }
            newAlbums={ newAlbum }
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
