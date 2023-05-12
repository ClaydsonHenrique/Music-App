import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      usuarios: [],
    };
  }

  componentDidMount() {
    this.PegandoDados();
  }

  async PegandoDados() {
    const todosDados = await getUser();
    this.setState({
      usuarios: todosDados,
    });
  }

  render() {
    const { usuarios } = this.state;
    const { email, image, description, name } = usuarios;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          <h1>perfil</h1>
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
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </>
    );
  }
}

export default Profile;
