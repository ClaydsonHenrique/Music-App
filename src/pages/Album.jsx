import React from 'react';
import Header from '../components/Header';
import musicsApi from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      album: [],
    };
  }

  componentDidMount() {
    this.getAlbum();
  }

  async getAlbum() {
    const number = 79789358;
    const musicas = await musicsApi(number);
    this.setState({ album: musicas });
  }

  render() {
    const { album } = this.state;
    console.log(album);
    return (
      <>
        <Header />
        <div data-testid="page-album" />
      </>
    );
  }
}

export default Album;
