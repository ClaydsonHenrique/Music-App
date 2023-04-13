import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class Header extends React.Component {
  render() {
    return (
      <header data-testid="header-component">
        <ul>
          <li><Link data-testid="link-to-search" to="/search">search</Link></li>
          <li><Link data-testid="link-to-favorites" to="/favorites">favoritos</Link></li>
          <li><Link data-testid="link-to-profile" to="/profile">profile</Link></li>

        </ul>
      </header>
    );
  }
}
export default Header;
