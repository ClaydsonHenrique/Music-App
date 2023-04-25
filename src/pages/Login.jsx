import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

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
    this.setState({ loading: true });
    await createUser({ name: nome });
    console.log('loading flahou');
    this.setState({
      redirect: true,
      loading: false });
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

    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        { !loading
          ? (
            <form onSubmit={ this.createName }>
              <input
                onChange={ this.validateInput }
                value={ nome }
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
            </form>)
          : <Carregando /> }
      </div>
    );
  }
}

export default Login;
