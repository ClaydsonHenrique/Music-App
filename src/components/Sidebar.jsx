import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/Header.css';
import { FaSearch } from 'react-icons/fa';
import { GrFavorite } from 'react-icons/gr';
import { LiaUserCircleSolid } from 'react-icons/lia';
import Carregando from './Carregando';
import logo from '../images/login.svg';
import { getUser } from '../services/userAPI';

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
    };
  }

  componentDidMount() {
    const resolve = Promise.resolve(getUser());
    const data = resolve.then((v) => {
      this.setState(
        { name: v.name,
          loading: true },
      );
    });
    return data;
  }

  render() {
    const {
      name,
      loading,
    } = this.state;
    return (
      <div className="containerMenu">
        {
          loading
            ? (
              <header className="links">
                <img src={ logo } alt="" className="logo" />
                <ul>
                  <li>
                    <FaSearch />
                    <Link
                      className="link"
                      data-testid="link-to-search"
                      to="/search"
                    >
                      search
                    </Link>

                  </li>
                  <li>
                    <GrFavorite />
                    <Link
                      className="link"
                      data-testid="link-to-favorites"
                      to="/favorites"
                    >
                      favoritos
                    </Link>

                  </li>
                  <li>
                    <LiaUserCircleSolid className="icon" />
                    <Link
                      className="link"
                      data-testid="link-to-profile"
                      to="/profile"
                    >
                      profile
                    </Link>
                  </li>
                </ul>
                <div><p className="header-user-name">{name}</p></div>
              </header>)
            : <Carregando />
        }
      </div>
    );
  }
}
export default Sidebar;
