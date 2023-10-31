import React from 'react';
import AuthProvider from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { cerrarSesion } from '../firebase/fb';

export default function CerrarSesion() {

    const navigate = useNavigate();


    async function handleUserLoggedIn(user){
      await cerrarSesion();
    }
    
    function handleUserNotRegistered(user){
      navigate("/iniciar");
    }
    
    function handleUserNotLoggedIn(){
      navigate("/iniciar");
    }

  return (
    <AuthProvider onUserLoggedIn={handleUserLoggedIn} onUserNotRegistered={handleUserNotRegistered} onUserNotLoggedIn={handleUserNotLoggedIn}>

    </AuthProvider>
  )
}
