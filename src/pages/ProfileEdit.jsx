import React from 'react';
import PropTypes from 'prop-types';
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
    const {
      nome,
      email,
      image,
      description } = this.state;
    const { history } = this.props;
    await updateUser({ name: nome, email, image, description });
    history.push('/profile');
  };

  render() {
    const { nome,
      email,
      image,
      description,
      disable,
      loading,
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        { loading && <Carregando />}
        <h1>Editar perfil</h1>
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
          data-testid="edit-button-save"
          disabled={ disable }
          onClick={ this.formSubmit }
        >
          Salvar

        </button>

      </div>

    );
  }
}

export default ProfileEdit;

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
