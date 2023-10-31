import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './routes/Login';
import Panel from './routes/Panel';
import EditarPerfil from './routes/EditarPerfil';
import TiendaPublica from './routes/TiendaPublica';
import NombrarTienda from './routes/NombrarTienda';
import CerrarSesion from './routes/CerrarSesion';
import Rutaprueba from './routes/Rutaprueba';
import ChatScreen from './routes/ChatScreen';
import ServiceSelector from './routes/ServiceSelector';
import ServiceScreen from './routes/ServiceScreen';
import FileScreen from './routes/FileScreen';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="iniciar" element={<Login/>} />
        <Route path="rutaprueba" element={<Rutaprueba/>} />
        <Route path="panel" element={<Panel/>} />
        <Route path="chatscreen" element={<ChatScreen/>} />
        <Route path="serviceselector" element={<ServiceSelector/>} />
        <Route path="servicescreen" element={<ServiceScreen/>} />
        <Route path="filescreen" element={<FileScreen/>} />

        <Route path="panel/perfil" element={<EditarPerfil/>} />
        <Route path="tienda/:tienda" element={<TiendaPublica/>} />
        <Route path="nombra-tu-tienda" element={<NombrarTienda/>} />
        <Route path="cerrar-sesion" element={<CerrarSesion/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
