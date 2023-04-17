import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: true,
    };
  }

  validateInput = ({ target }) => {
    const { value } = target;
    if (value.length >= 3) {
      this.setState(
        { disable: false },
      );
    }
  };

  render() {
    const {
      disable,
    } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            onChange={ this.validateInput }
            type="text"
            data-testid="login-name-input"
            placeholder="nome"
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ disable }
          >
            Entrar

          </button>
        </form>

      </div>
    );
  }
}

export default Login;
