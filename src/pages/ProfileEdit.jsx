import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      image: '',
      description: '',
      redirect: false,
      disable: true,
      loading: false,
    };
  }

  componentDidMount() {
    this.getusers();
  }

  validateInputs = () => {
    const { nome,
      email,
      image,
      description } = this.state;
    const validate = (
      nome.length > 0
        && email.length > 0
        && image.length > 0
        && description.length > 0);
    if (validate) {
      this.setState(
        { disable: false },
      );
    } else {
      this.setState(
        { disable: true },
      );
    }
    return validate;
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.validateInputs);
  };

  getusers = async () => {
    this.setState({ loading: true });
    const result = await getUser();
    console.log(result);
    const { name, email, description, image } = result;
    this.setState({ nome: name, email, description, image, loading: false });
  };

  formSubmit = async () => {
    const { nome,
      email,
      image,
      description } = this.state;
    this.setState({ loading: true });
    await updateUser({ name: nome, email, image, description });
    this.setState({
      redirect: true,
      loading: false,
    });
  };

  render() {
    const { nome,
      email,
      image,
      description,
      disable,
      loading,
      redirect } = this.state;

    if (redirect) {
      return <Redirect to="/profile" />;
    }
    return (
      <>
        <Header />
        { loading ? <Carregando />
          : (
            <div data-testid="page-profile-edit">
              <form onSubmit={ this.formSubmit }>
                <label>
                  name
                  <input
                    onChange={ this.onInputChange }
                    data-testid="edit-input-name"
                    type="text"
                    name="nome"
                    id="name"
                    value={ nome }
                  />
                </label>
                <label>
                  email
                  <input
                    onChange={ this.onInputChange }
                    data-testid="edit-input-email"
                    type="text"
                    name="email"
                    id="email"
                    value={ email }
                  />
                </label>
                <label>
                  Description
                  <input
                    onChange={ this.onInputChange }
                    data-testid="edit-input-description"
                    type="text"
                    name="description"
                    id="description"
                    value={ description }
                  />
                </label>
                <label>
                  image
                  <input
                    onChange={ this.onInputChange }
                    data-testid="edit-input-image"
                    type="text"
                    name="image"
                    id="image"
                    value={ image }
                  />
                </label>
                <button
                  type="submit"
                  data-testid="edit-button-save"
                  disabled={ disable }
                >
                  submit

                </button>
              </form>
            </div>
          )}
      </>
    );
  }
}

export default withRouter(ProfileEdit);
