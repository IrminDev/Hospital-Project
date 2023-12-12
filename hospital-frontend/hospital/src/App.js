import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <div className="fixed w-[100%]">
        <div className="flex justify-between items-center px-5 py-5 font-semibold">
          <Link to={'./'} className="text-2xl text-white">
            <span className='text-blue-500'>H</span>ospital
          </Link>
          <div className=" flex justify-between items-center ">
            <ul className=" flex items-center ">
              <li className=" inline-block mr-10 text-blue-500 transition ease-linear hover:text-blue-50">
                <Link to={'./login'} className="">Inicio de sesión</Link>
              </li>
              <li className=" inline-block text-blue-500 transition ease-linear hover:text-blue-50">
                <Link to={'./sign-up'} className="">Registro</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className=" flex items-center h-[100vh] min-h-[500px] bg-main bg-no-repeat bg-cover bg-center">
        <div className=' px-10'>
          <h1 className=' text-5xl mb-10 text-white '>¡Bienvenido a nuestro hospital!</h1>
          <p className=' text-xl mb-10 text-white'>Esta aplicación web esta diseñada para que nuestros doctores y pacientes tengan una mejor experiencia. Si eres paciente puede registrarte para poder agendar una cita con nuestros doctores.</p>
          <Link to={'./sign-up'} className=' transition ease-linear border rounded-md border-blue-400 px-3 py-2 mt-5 text-blue-300 hover:text-white hover:border-none hover:bg-blue-400'>
            Vamos alla
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
