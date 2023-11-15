import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import '../styles/Profile.css';

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
      <section className="containerProfile">
        <Header />
        <div className="imgBg" />
        <div className="imgPerfilEdit">
          <img className="profile-image" src={ image } alt="perfil" />
        </div>
        <div className="page-profile">
          <div>
            <h3 className="titleProfile">Name</h3>
            <p className="nameProfile">{name}</p>
          </div>
          <div>
            <h3 className="titleProfile">Email</h3>
            <p className="nameProfile">{email}</p>
          </div>

          <div>
            <h3 className="titleProfile">descricption</h3>
            <p className="description">{description}</p>
          </div>
          <Link to="/profile/edit" className="btnEdit">Editar perfil</Link>
        </div>
      </section>
    );
  }
}

export default Profile;
