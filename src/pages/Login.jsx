import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      redirect: false,
      nome: '',
      disable: true,
    };
  }

  createName = async (e) => {
    e.preventDefault();
    const {
      nome,
    } = this.state;
    await createUser({ name: nome });
    this.setState({
      redirect: true,
      loading: true,
    });
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
      loading,
      redirect,
      nome,
      disable,
    } = this.state;
    if (loading) {
      return <Redirect to="/Carregando" />;
    }
    if (redirect) {
      return <Redirect to="/search" />;
    }
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
