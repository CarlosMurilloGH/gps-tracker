import React from 'react';
import { Link } from 'react-router-dom';

export default function PanelWrapper({children}) {
  return (
    <div>
        <nav>
            <p>Logo</p>
            <Link to="/panel">Panel</Link>
            <Link to="/panel/perfil">Editar</Link>
        </nav>
        <hr></hr>
        <div>
        {children}
        </div>
    </div>
  )
}
