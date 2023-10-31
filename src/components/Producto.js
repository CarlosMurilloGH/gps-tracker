import React,{useEffect, useRef, useState} from 'react';
import './Producto.css';

export default function Producto({docId, nombre,descripcion, precio, onDelete, onUpdate}) {

    //Controlamos el valor actual de los nombres
    const [currentNombre,setCurrentNombre]=useState(nombre);
    const [currentDescripcion,setCurrentDescripcion]=useState(descripcion);
    const [currentPrecio,setCurrentPrecio]=useState(precio);

    //Estados de input activo o no
    const [editNombre,setEditNombre]=useState(false);
    const [editDescripcion,setEditDescripcion]=useState(false);
    const [editPrecio,setEditPrecio]=useState(false);

    //Referencias
    const nombreRef = useRef(null);
    const descripcionRef = useRef(null);
    const precioRef = useRef(null);

    //Estamos al pendiente del cambio de valor de la edición del nombre
    useEffect(()=>{
        if(nombreRef.current){
            nombreRef.current.focus();
        }
    },[editNombre])
    
    //pendientes de la descripcion
    useEffect(()=>{
        if(descripcionRef.current){
            descripcionRef.current.focus();
        }
    },[editDescripcion])
    
    //pendientes del precio
    useEffect(()=>{
        if(precioRef.current){
            precioRef.current.focus();
        }
    },[editPrecio])

    //Funciones para cambiar el estado de input a texto
    function handleEditNombre(){
        setEditNombre(true);
    }

    function handleEditDescripcion(){
        setEditDescripcion(true);
    }

    function handleEditPrecio(){
        setEditPrecio(true);
    }

    //funciones de cambio de valor con inputs
    function handleChangeNombre(e){
        setCurrentNombre(e.target.value);
    }

    function handleChangeDescripcion(e){
        setCurrentDescripcion(e.target.value);
    }

    function handleChangePrecio(e){
        setCurrentPrecio(e.target.value);
    }
    

    //Cuando se le quita el focus al input regresa a su estado original y actualiza su valor
    function handleBlurNombre(e){
        setEditNombre(false);
        onUpdate(docId, currentNombre, currentDescripcion,currentPrecio );
    }

    function handleBlurDescripcion(e){
        setEditDescripcion(false);
        onUpdate(docId, currentNombre, currentDescripcion,currentPrecio );
    }

    function handleBlurPrecio(e){
        setEditPrecio(false);
        onUpdate(docId, currentNombre, currentDescripcion,currentPrecio );
    }

    //Borramos el documento
    function handleDelete(){
        onDelete(docId);
    }

  return (
    <div key={docId} style={{border: '1px solid red'}}>
        <div className='productoNombreContainer'>
            {editNombre ? (
                <>
                    <input ref={nombreRef} value={currentNombre} onChange={handleChangeNombre} onBlur={handleBlurNombre} />
                </>
            ):(
                <>
                <button onClick={handleEditNombre}>Editar</button>
                <p>Nombre:{currentNombre}</p>
                </>
            )}
        </div>

        <div className='productoDescripcionContainer'>
            {editDescripcion ? (
                <>
                    <input ref={descripcionRef} value={currentDescripcion} onChange={handleChangeDescripcion} onBlur={handleBlurDescripcion} />
                </>
            ) : (
                <>
                    <button onClick={handleEditDescripcion}>Editar</button>
                    <p>Descripcion:{currentDescripcion}</p>
                </>
            )}

        </div>

        <div className='productoPrecioContainer'>   
            {editPrecio ? (
                <>
                    <input ref={precioRef} value={currentPrecio} onChange={handleChangePrecio} onBlur={handleBlurPrecio} />                
                </>
            ) : (
                <>
                    <button onClick={handleEditPrecio}>Editar</button>
                    <p>Precio:{currentPrecio}</p>
                </>
            )}       
        </div>

        <div>
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    </div>
  )
}
