import React from 'react';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import { useHistory } from 'react-router-dom';

function ProfileEdit() {

  const history = useHistory();
  const [user, setUser] = React.useState({
    nome: '',
    email: '',
    image: '',
    description: '',
  });
  const [disable, setDisable] = React.useState(true);
  const [loading, setLoading] = React.useState(false);


  React.useEffect(() => {
    getusers();
  }, []);



  const validateInputs = () => {
    const { nome,
      email,
      image,
      description } = user
    const validate = (
      nome.length > 0
      && email.length > 0
      && image.length > 0
      && description.length > 0);
    if (validate) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    return validate;
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateInputs();
  };

  const getusers = async () => {
    setLoading(true);
    const result = await getUser();
    console.log(result);
    const { name, email, description, image } = result;
    setUser({
      nome: name,
      email,
      description: description || '',
      image: image || '',
    });
    setLoading(false)
  };

  const formSubmit = async () => {
    const {
      nome,
      email,
      image,
      description } = user;
    await updateUser({ name: nome, email, image, description });
    history.push('/profile');
  };

  return (
    <section>
      <div className='text-white  p-4 shadow-lg mb-4'>
        <h1>Edit Profile</h1>
        <p>Update your profile information below.</p>
      </div>
      <div className='bg-white/5 text-white shadow-lg rounded-lg p-4 flex gap-4  items-center'>
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border border-gray-300 shadow-lg bg-green-500 flex justify-center items-center ">
          <img
            className="w-full h-full object-cover"
            src="" alt="" />
        </div>
        <div>
          <h3>Profile Photo</h3>
          <p>Upload a new profile photo</p>
          <button>Upload Photo</button>
          <button>Remove</button>
        </div>
      </div>
      <div className="mt-3 bg-white/5 p-4 shadow-lg rounded-lg text-white ">
        <h3>Edit Profile</h3>
        {loading ? <Carregando /> : (
          <form onSubmit={formSubmit} className='flex flex-col gap-4'>
            <label htmlFor="nome" className="block mb-2 flex gap-4">
              nome:
              <input
              className='w-full border border-gray-300 rounded-lg p-2 bg-white text-black'
                id='nome'
                type="text"
                name="nome"
                value={user.nome}
                onChange={onInputChange}
                placeholder="Name"
              />
            </label>
            <label htmlFor="email" className="block mb-2 flex gap-4">
              Email:
              <input
              className='w-full border border-gray-300 rounded-lg p-2 bg-white text-black '
                type="email"
                name="email"
                value={user.email}
                onChange={onInputChange}
                placeholder="Email"
              />
            </label>
            <label htmlFor="description" className="block mb-2 flex gap-4 ">
              bio:
              <textarea
              className='resize-none w-full h-32 border border-gray-300 rounded-lg p-2 bg-white text-black '
                id='description'
                name="description"
                value={user.description}
                onChange={onInputChange}
                placeholder="Description"
              />
            </label>
            
            <div>
              <button
                className='cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type="submit" disabled={disable}>Save Changes</button>

              <button>cancelar</button>
            </div>
          </form>
        )}
      </div>
    </section>

  );
}

export default ProfileEdit;
