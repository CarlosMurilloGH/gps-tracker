import React,{useState} from 'react';
import PanelWrapper from '../components/PanelWrapper';
import AuthProvider from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { getStorePhotoUrl, setUserStorePhoto, updateUser } from '../firebase/fb';
import { updateCurrentUser } from 'firebase/auth';


export default function EditarPerfil() {

  const [currentUser,setCurrentUser]=useState({});
  const [state,setCurrentState]=useState(0);
  const [tiendaLogoUrl,setTiendaLogoUrl]=useState(null);
  
  const navigate=useNavigate();

  const fileRef=useRef(null);

  async function handleUserLoggedIn(user){
    const url = await getStorePhotoUrl(user.profilePicture)
    setCurrentUser(user);
    setCurrentState(2);
  }

  function handleUserNotRegistered(user){
    navigate('/iniciar');

    }

  function handleUserNotLoggedIn(){
    navigate("/iniciar");
  }

  function handleOpenFilePicker(){
    if(fileRef.current){
      fileRef.current.click();
    }
  }

function handleChangeFile(e){
  const files = e.target.files;
  const fileReader = new FileReader();

  if (fileReader && files && files.length >0){
    fileReader.readAsArrayBuffer(files[0]);
    fileReader.onload = async function(){
      const imageData = fileReader.result;

      const res = await setUserStorePhoto(currentUser.uid, imageData)

      if (res){
        const tmpUser = {...currentUser};
        tmpUser.tiendaLogo= res.metadata.fullPath;
        await updateUser(tmpUser);
        setCurrentUser({...tmpUser});
        const url = await getStorePhotoUrl(currentUser.tiendaLogo);
        setTiendaLogoUrl(url);
      }
    }
  }
}


  if(state !== 2){
    return (
      <AuthProvider        
    onUserLoggedIn={handleUserLoggedIn}
    onUserNotLoggedIn={handleUserNotLoggedIn}
    onUserNotRegistered={handleUserNotRegistered}
    >

    </AuthProvider>
    )
    
  }
  return (
      <PanelWrapper>
        <h1>Edita tu perfil</h1>
        <div>
          <div>
            <img src={tiendaLogoUrl} alt="" width={100} />
          </div>
          <div>
            <button onClick={handleOpenFilePicker}>Escoge el logo de tu tienda</button>
            <input type="file"  ref={fileRef} style={{display:"none"}} onChange={handleChangeFile} />
          </div>
        </div>
      </PanelWrapper>
  )
}
