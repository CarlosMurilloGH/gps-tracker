import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthProvider from '../components/AuthProvider';
import { cerrarSesion, DeleteProducto, getProductos, insertNewProducto, updateProducto } from '../firebase/fb';
import './ServiceSelector.css';
import ServicioIcon from '../assets/servicioIcon.png';

export default function ServiceSelector() {

    async function handleLogout(auth){
        cerrarSesion(auth);
      }

      const navigate=useNavigate();

      const [currentUser,setCurrentUser]=useState({});
      const [state,setCurrentState]=useState(0);
      const [nombre,setNombre]=useState("");
      const [precio,setPrecio]=useState("");
      const [descripcion,setDescripcion]=useState("");
      const [productos,setProductos]=useState([]);

  async function handleUserLoggedIn(user){
      setCurrentUser(user);
      setCurrentState(2);
      const resProductos = await getProductos(user.uid);
      setProductos([...resProductos]);
    }

    function handleUserNotRegistered(user){
      navigate('/iniciar');

      }

      function navigateService(user){
        navigate('/servicescreen');
  
        }

    function handleUserNotLoggedIn(){
      navigate("/iniciar");
    }

    if(state === 0){
      return (
        <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
        onUserNotLoggedIn={handleUserNotLoggedIn}
        >
          Loading...
        </AuthProvider>
      )
    }

  return (
    <div className='servicecontainer'>
        <div className='servicebox'>
            <div>
                <button className='servicebutton' onClick={navigateService}>
                  <img src={ServicioIcon} alt="Botón" style={{ width: '100px', height: '100px' }} />
                  <p>Servicio 1</p>
                </button>
            </div>

            <div>
              <button className='servicebutton' onClick={navigateService}>
                  <img src={ServicioIcon} alt="Botón" style={{ width: '100px', height: '100px' }} />
                  <p>Servicio 2</p>
                </button>
            </div>

            <div>
            <button className='servicebutton' onClick={navigateService}>
                  <img src={ServicioIcon} alt="Botón" style={{ width: '100px', height: '100px' }} />
                  <p>Servicio 3</p>
                </button>
            </div>
        </div>
    </div>
  )
}
