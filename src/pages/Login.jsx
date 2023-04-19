import React from 'react';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      disable: true,
    };
  }

  createName = async (e) => {
    e.preventDefault();
    const {
      nome,
    } = this.state;
    const data = await createUser({ name: nome });
    console.log(data);
  };

  validateInput = ({ target }) => {
    const { value } = target;
    const limiteLetter = 3;
    this.setState({
      nome: value,
    });
    if (value.length >= limiteLetter) {
      this.setState(
        {
          disable: false,
        },
      );
    }
  };

  render() {
    const {
      nome,
      disable,
    } = this.state;

    // createUser.nome = this.validateInput;
    return (
      <div data-testid="page-login">
        <form>
          <input
            onChange={ this.validateInput }
            value={ nome }
            type="text"
            data-testid="login-name-input"
            placeholder="nome"
          />
          <button
            onClick={ this.createName }
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
