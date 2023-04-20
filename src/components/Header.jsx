import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  render() {
    const getname = async () => {
      const resolve = Promise.resolve(getUser());
      const data = resolve.then((v) => {
        this.setState(
          { name: v.name },
        );
      });
      return data;
    };
    const {
      name,
    } = this.state;
    return (
      <div>
        {
          !getname()
            ? <Carregando />
            : (
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
        }
      </div>
    );
  }
}
export default Header;
