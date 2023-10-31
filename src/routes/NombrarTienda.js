import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { existsTienda, updateUser } from '../firebase/fb';
import AuthProvider from '../components/AuthProvider';

export default function NombrarTienda() {
  const [state,setCurrentState]=useState(0);
  const [currentUser,setCurrentUser]=useState([]);

  const [nombreTienda,setNombreTienda]=useState([]);

  const navigate=useNavigate();

  function handleUserLoggedIn(user){
      navigate("/panel");
    }

    function handleUserNotRegistered(user){
      setCurrentUser(user);
      setCurrentState(3);
      }

    function handleUserNotLoggedIn(){
      navigate("/iniciar");
    }

    function handleInputNombreNegocio(e){
      setNombreTienda(e.target.value);
    }

    async function handleContinue(){
      if(nombreTienda !== ""){
        const exists = await existsTienda(nombreTienda);
        if(exists){
          setCurrentState(5);
        }else{
          const tmp= {...currentUser};
          tmp.nombreTienda=nombreTienda;
          tmp.processCompleted = true;
          await updateUser(tmp);
          setCurrentState(6);
        }
      }
    }

    if(state===3 || state===5){
      return (
        <div>
          <p>Bienvenido {currentUser.displayName}</p>
          <p>elige un nombre para tu tienda</p>
          {state === 5? <p>El nombre de la tienda ya existe, escoge otro</p> : ""}

          <div>
              <input type="text" onChange={handleInputNombreNegocio}/>
          </div>

          <div>
            <button onClick={handleContinue}>Continuar</button>
          </div>
        </div>
      )

    }

    if(setCurrentState===6){
      return(
        <div>
          <p>Felicidades,ya puedes ir al dashboard</p>
          <Link to="/panel">Continuar</Link>
        </div>
      )
    }

  return(
      <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      >

      </AuthProvider>
  )
}
