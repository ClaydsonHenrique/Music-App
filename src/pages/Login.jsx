import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import '../styles/Login.css';
import logo from '../images/login.svg';

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
    this.setState({
      redirect: true,
      loading: false,
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

    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <section className="containerLogin">
        {!loading
          ? (
            <div className="page-login">
              <div><img src={ logo } alt="" /></div>
              <form onSubmit={ this.createName } className="loginForm">
                <input
                  onChange={ this.validateInput }
                  value={ nome }
                  type="text"
                  className="login-name-input"
                  placeholder="nome"
                />
                <button
                  type="submit"
                  className="login-submit-button"
                  disabled={ disable }
                >
                  Entrar
                </button>
              </form>
            </div>)
          : <Carregando />}

      </section>
    );
  }
}

export default Login;
