import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthProvider from '../components/AuthProvider';
import { cerrarSesion, DeleteProducto, getProductos, insertNewProducto, updateProducto } from '../firebase/fb';
import FilesIcon from '../assets/filesicon.png';
import './FileScreen.css';

function FileScreen() {

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

      function navigateservice(user){
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
    <div className='filescontainer'>
    <div className='filesbox'>
        <div>
            <button className='servicebutton'>
              <img src={FilesIcon} alt="Botón" style={{ width: '100px', height: '100px' }} />
              <p>Archivo 1</p>
            </button>
        </div>

        <div>
            <button className='servicebutton' >
              <img src={FilesIcon} alt="Botón" style={{ width: '100px', height: '100px' }} />
              <p>Archivo 2</p>
              </button>
        </div>

        <div>
            <button className='servicebutton'>
              <img src={FilesIcon} alt="Botón" style={{ width: '100px', height: '100px' }} />
              <p>Archivo 3</p>
            </button>
        </div>
    </div>
</div>
  )
}

export default FileScreen