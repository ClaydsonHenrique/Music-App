import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
    };
  }

  componentDidMount() {
    const resolve = Promise.resolve(getUser());
    console.log(resolve);
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
      <div>
        {
          loading
            ? (
              <header data-testid="header-component">
                <ul>
                  <li>
                    <Link
                      className="link"
                      data-testid="link-to-search"
                      to="/search"
                    >
                      search
                    </Link>

                  </li>
                  <li>
                    <Link
                      className="link"
                      data-testid="link-to-favorites"
                      to="/favorites"
                    >
                      favoritos
                    </Link>

                  </li>
                  <li>
                    <Link
                      className="link"
                      data-testid="link-to-profile"
                      to="/profile"
                    >
                      profile

                    </Link>

                  </li>
                </ul>

                <p data-testid="header-user-name">{name}</p>

              </header>)
            : <Carregando />
        }
      </div>
    );
  }
}
export default Header;
