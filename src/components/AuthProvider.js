import React,{useState,useEffect} from "react";
import { onAuthStateChanged} from "firebase/auth";
import {auth, getUserInfo, registerNewUser, userExists} from "../firebase/fb";
import {useNavigate} from "react-router-dom";

export default function AuthProvider({children,onUserLoggedIn,onUserNotLoggedIn,onUserNotRegistered}){
    const navigate=useNavigate();
    const [state,setCurrentState]=useState(0);

    //Vamos a detectar si el usuario está autenticado
  useEffect(()=>{
    //con esta función de firebase comprobamos en cada render en que fase está el usuario
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        //Acá comprobamos si el usuario existe
        const isRegistered = await userExists(user.uid);
        if(isRegistered){
          const userInfo= await getUserInfo(user.uid);
          if(userInfo.processCompleted){
            onUserLoggedIn(userInfo);
          }else{
            onUserNotRegistered(userInfo);
          }
        }else{
          await registerNewUser({
            uid:user.uid,
            displayName:user.displayName,
            nombreTienda:"",
            tiendaLogo:"",
            processCompleted:false,
          });
          onUserNotRegistered(user);
        }
      }else{
        onUserNotLoggedIn();
      }
    });
  },[navigate,onUserLoggedIn,onUserNotRegistered,onUserNotLoggedIn]);


    return <div>{children}</div>
}