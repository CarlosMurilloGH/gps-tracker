import React,{useState} from 'react';
import "./Rutaprueba.css";
import { useNavigate } from 'react-router-dom';
import AuthProvider from '../components/AuthProvider';
import { cerrarSesion, DeleteProducto, getProductos, insertNewProducto, updateProducto } from '../firebase/fb';


export default function Rutaprueba() {

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
        function navigateServices(user){
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

    return(
        <div className='container'>
          <div className='boxcontainer'>
            <div className="mapcontainer">
              <h1 className='maptitle'>Mapa de ruta</h1>
                <iframe className="googlemap"
                src="https://codesandbox.io/embed/react-vehicle-tracking-google-map-1fplt?fontsize=14&hidenavigation=1&theme=dark" 
                title="react-vehicle-tracking-google-map"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              ></iframe>
            </div>

            <div className='formcontainer'>
              <input placeholder='Origen'/>
              <input placeholder='A donde vas?'/>
              <button className='buttongoogle'>Comenzar</button>
              <button className='buttonlogin' onClick={navigateServices}>Atras</button>
            </div>

          
            <button onClick={handleLogout} className='buttonlogin'>Cerrar sesión</button>
          </div>

   </div>
    )
}

