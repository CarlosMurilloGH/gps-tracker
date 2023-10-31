import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthProvider from '../components/AuthProvider';
import { cerrarSesion, DeleteProducto, getProductos, insertNewProducto, updateProducto } from '../firebase/fb';

import ChatBox from './ChatBox';  // Adjust path accordingly
import ChatInput from './ChatInput';  // Adjust path accordingly
import './ChatScreen.css';

function ChatScreen() {
  const [username, setUsername] = useState('User1');  // Here I used a hardcoded username. Ideally, you should integrate authentication to get the username.


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

  function navigateChat(user){
    navigate('/chatscreen');

    }

    function navigateServices(user){
      navigate('/servicescreen');
  
      }


  return (
    <div className='chatscreencontainer'>

        <div className='widthbox'>
        <h2 style={{color:'#fff'}}>Chat con cliente ABC</h2>

        <div className='chatbox' style={{backgroundColor:'#F4F2F1'}}>
            <ChatBox />
            <ChatInput username={username} />
          </div>
            <button onClick={handleLogout} className='buttonlogin'>Cerrar sesion</button>
        <button onClick={navigateServices} className='buttonlogin'>Atras</button>
        </div>


    </div>
  );
}

export default ChatScreen;
