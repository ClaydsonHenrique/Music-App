import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';

function Profile() {

  const [usuarios, setUsuarios] = React.useState([]);
  const [active, setActive] = React.useState(false);
  const [valid, setValid] = React.useState('');
  const [conta, setconta] = React.useState({ name: '', email: '', subscription: '', });
  const [subscription, setSubscription] = React.useState({ plan: '', price: '', status: '', });
  const [privacidade, setPrivacidade] = React.useState({ data: '', notifications: '', });



  const PegandoDados = async () => {
    const todosDados = await getUser();
    setUsuarios(todosDados);
  }

  const handleclick = (name) => {
    setActive(!active);
    setValid(name);
  }

  React.useEffect(() => {
    PegandoDados();
  }, []);


  const dadosConta = () => {
    setconta({
      name: usuarios.name,
      email: usuarios.email || 'email não cadastrado',
      subscription: usuarios.subscription ? 'Ativo' : 'Inativo',
    });
    setSubscription({
      plan: usuarios.subscriptionPlan || 'Simples',
      price: usuarios.subscriptionPrice ? `${usuarios.subscriptionPrice} ${usuarios.subscriptionCurrency}` :
      'R$ 0,00' ,
      status: usuarios.subscriptionStatus || 'Nenhum plano ativo ',
    });
    setPrivacidade({
      data: 'Dados pessoais',
      notifications: 'Notificações',
    });
  }

  React.useEffect(() => {
    dadosConta();
  }, [usuarios]);

  console.log(usuarios);


  return (
    <section className=" ">
      <div className="flex gap-2 justify-evenly p-4 bg-zinc-900 text-white shadow-lg rounded-lg " >
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border border-gray-300 shadow-lg  bg-green-500 flex justify-center items-center ">
          {usuarios.image === '' ? (
            <h1 className="text-5xl text-center ">C</h1>
          ) : (
            <img
              src={usuarios.image}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className='flex flex-col gap-5 p-4'>
          <h2 className="text-white text-4xl ">{usuarios.name}</h2>
          <div className="flex  gap-2">
            <p className="text-gray-400  flex flex-col justify-center items-center  ">{usuarios.playlist} <span>playlists</span> </p>
            <p className="text-gray-400 flex flex-col justify-center items-center " >{usuarios.followers} <span>
              seguidores
            </span></p>
            <p className="text-gray-400 flex flex-col justify-center items-center ">{usuarios.following} <span>
              seguindo
            </span> </p>
          </div>
          <p className=''>{usuarios.description}</p>
        </div>
        <div>
          <Link to="/profile/edit">
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Editar Perfil
            </button>
          </Link>
        </div>
      </div>
      <div>

        <div
          onClick={() => handleclick('configuracoes')}
          className="cursor-pointer flex flex-col p-4 bg-white/5 text-white border border-gray-300 shadow-lg rounded-lg mt-4  hover:bg-gray-900 transition-colors duration-300">
          <div

            className="flex justify-between items-center cursor-pointer p-2 transition-colors duration-300"
          >
            <p>configurações</p>
            <p className="text-1xl">v</p>
          </div>


        </div>
        <div
          className={` text-white bg-white/5  overflow-hidden transition-all duration-500 ${active && valid === 'configuracoes' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="p-2 flex flex-col gap-3">
            <p className='border border-gray-300 rounded-lg p-3  '>{conta.name}</p>
            <p className='border border-gray-300 rounded-lg p-3 '>{conta.email}</p>
            <p className='border border-gray-300 rounded-lg p-3 '>{conta.subscription}</p>
          </div>
        </div>

        <div
          onClick={() => handleclick('plano')}
          className="cursor-pointer flex flex-col p-4 bg-white/5 text-white border border-gray-300 shadow-lg rounded-lg mt-4  hover:bg-gray-900 transition-colors duration-300">
          <div

            className="flex justify-between items-center cursor-pointer p-2 transition-colors duration-300"
          >
            <p>plano</p>
            <p className="text-1xl">v</p>
          </div>

         
        </div>
        
        <div
          className={`text-white bg-white/5 overflow-hidden transition-all duration-500 ${active && valid === 'plano' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="p-2 flex flex-col gap-3">
            <p className='border border-gray-300 rounded-lg p-3  '>{subscription.plan}</p>
            <p className='border border-gray-300 rounded-lg p-3 '>{subscription.price}</p>
            <p className='border border-gray-300 rounded-lg p-3 '>{subscription.status}</p>
          </div>
        </div>

        <div
          onClick={() => handleclick('privacidade')}
          className="text-white bg-white/5  cursor-pointer flex flex-col p-4 text-white border border-gray-300 shadow-lg rounded-lg mt-4 hover:bg-gray-900 transition-colors duration-300">
          <div
            className="flex justify-between items-center cursor-pointer p-2 "
          >
            <p>privacidade</p>
            <p className="text-1xl">v</p>
          </div>


        </div>

        <div
          className={`text-white bg-white/5 overflow-hidden transition-all duration-500 ${active && valid === 'privacidade' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="p-2  flex flex-col gap-2">
            <p className='border border-gray-300 p-3'>dados pessoais</p>
            <p className='border border-gray-300 p-3'>notificação</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
