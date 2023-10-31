import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthProvider from '../components/AuthProvider';
import { cerrarSesion, DeleteProducto, getProductos, insertNewProducto, updateProducto } from '../firebase/fb';
import './ServiceScreen.css';

import MapIcon from '../assets/mapicon.png';
import ChatIcon from '../assets/chaticon.png';
import FilesIcon from '../assets/filesicon.png';

function ServiceScreen() {
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

      function navigateChat(user){
        navigate('/chatscreen');
        }

        function navigateRuta(user){
            navigate('/rutaprueba');
            }
            function navigateFiles(user){
              navigate('/filescreen');
              }
            function navigateArchivo(user){
                navigate('/archivos');
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
    <div className='serviceroutescontainer'>
        <div className='serviceroutesbox'>
            <div>
                <button className='servicebutton' onClick={navigateChat}>
                  <img src={ChatIcon} alt="Botón" style={{ width: '100px', height: '100px' }} />
                </button>
            </div>

            <div>
                <button className='servicebutton' onClick={navigateRuta}>
                  <img src={MapIcon} alt="Botón" style={{ width: '100px', height: '100px' }} />
                  </button>
            </div>

            <div>
                <button className='servicebutton' onClick={navigateFiles}>
                  <img src={FilesIcon} alt="Botón" style={{ width: '100px', height: '100px' }} />
                </button>
            </div>
        </div>
    </div>
  )

}

export default ServiceScreen;