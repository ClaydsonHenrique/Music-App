import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      usuarios: [],
    };
  }

  componentDidMount() {
    this.PegandoDados();
  }

  async PegandoDados() {
    this.setState({ loading: true });
    const todosDados = await getUser();
    this.setState({
      loading: false,
      usuarios: todosDados,
    });
  }

  render() {
    const { loading, usuarios } = this.state;
    const { email, image, name, description } = usuarios;
    return (
      <>
        <Header />
        { loading ? <Carregando />
          : (
            <div data-testid="page-profile">
              <h1>perfil</h1>
              <Link to="/profile/edit">Editar perfil</Link>
              <div>
                <h3>Name</h3>
                <p>{name}</p>
              </div>
              <div>
                <h3>Email</h3>
                <p>{email}</p>
              </div>
              <div>
                <img data-testid="profile-image" src={ image } alt="perfil" />
              </div>
              <div>
                <h3>descricption</h3>
                <p>{description}</p>
              </div>
            </div>)}
      </>
    );
  }
}

export default Profile;
