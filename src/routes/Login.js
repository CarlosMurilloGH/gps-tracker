import React,{useState} from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {auth} from "../firebase/fb";
import { useNavigate } from 'react-router-dom';
import AuthProvider from '../components/AuthProvider';
import "./Login.css";

export default function Login() {
  const navigate=useNavigate();
  // const [currentUser,setCurrentUser]=useState(null);
  /*
  Estados:
  0.-Inicializado
  1.-Loading
  2.-Login Completado
  3.-Login pero sin registro
  4.-no hay nadie logueado
  5.-Ya existe la tienda
  6.-Nueva tienda, click para continuar
  */
  const [state,setCurrentState]=useState(0);

  //con esto nos logeamos
  async function handleOnClick(){
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);

    async function signInWithGoogle(googleProvider){
      try {
        const res = await signInWithPopup(auth,googleProvider);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  }

    function handleUserLoggedIn(user){
      navigate("/serviceselector");
    }

    function handleUserNotRegistered(user){
      navigate("/nombra-tu-tienda");
    }

    function handleUserNotLoggedIn(){
      setCurrentState(4);
    }

     
    if(state === 4){
      return (
        <div className="Loginregistercontainer">
          <div className='formcontainer'>
            <div>
              <p className='textform'>Ingresa a tu cuenta</p>
            </div>
            <div>
              <input placeholder='email'/>
            </div>
            
            <div>
              <input type='password' placeholder='contraseña'/>
            </div>

            <div>
            <button className="buttonlogin" onClick={handleOnClick}>Entrar</button>
            </div>

            <button className="buttongoogle" onClick={handleOnClick}>Entra con Google</button>
          </div>
        </div>
      );
    }

    if(state === 5){
      return (
        <div className="Loginregistercontainer">
          <button onClick={handleOnClick}>Login Google</button>
        </div>
      );
    }
    
    return (
      <AuthProvider 
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      >
        <p>Loading...</p>
      </AuthProvider>
    );
  }



