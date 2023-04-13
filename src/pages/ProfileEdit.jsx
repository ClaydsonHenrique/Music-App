import React from 'react';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          <h1>Editar sua playlist</h1>
        </div>
      </>
    );
  }
}

export default ProfileEdit;
