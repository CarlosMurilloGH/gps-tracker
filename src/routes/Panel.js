import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthProvider from '../components/AuthProvider';
import PanelWrapper from '../components/PanelWrapper';
import { cerrarSesion, DeleteProducto, getProductos, insertNewProducto, updateProducto } from '../firebase/fb';
import {v4 as uuid} from 'uuid';
import Producto from '../components/Producto';

export default function Panel() {

  const [currentUser,setCurrentUser]=useState({});
  const [state,setCurrentState]=useState(0);
  const [nombre,setNombre]=useState("");
  const [precio,setPrecio]=useState("");
  const [descripcion,setDescripcion]=useState("");
  const [productos,setProductos]=useState([]);

  const navigate=useNavigate();

  async function handleUserLoggedIn(user){
      setCurrentUser(user);
      setCurrentState(2);
      const resProductos = await getProductos(user.uid);
      setProductos([...resProductos]);
    }

    function handleUserNotRegistered(user){
      navigate('/iniciar');

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

    //funciones del formulario

    //Enviar Formulario
    function handleOnSubmit(e){
      e.preventDefault();
      addProducto();
    }

    function addProducto(){
      if(nombre !== "" && precio !== ""){
        const newProducto={
          id:uuid(),
          nombre:nombre,
          precio:precio,
          descripcion:descripcion,
          uid:currentUser.uid,
        };
        const res=insertNewProducto(newProducto);
        newProducto.docId = res.id;
        setNombre("");
        setPrecio("");
        setDescripcion("");
        setProductos([...productos, newProducto ])
      }
    }

    //Obtener datos del formulario
    function handleOnChange(e){
      const value=e.target.value;
      if(e.target.name === "nombre"){
        setNombre(value);
      }
      if(e.target.name === "precio"){
        setPrecio(value);
      }
      if(e.target.name === "descripcion"){
        setDescripcion(value);
      }
    }

    async function handleDeleteProducto(docId){
      await DeleteProducto(docId);
      const tmp = productos.filter(producto => producto.docId !== docId);
      setProductos([...tmp])
    }

    async function handleUpdateProducto(docId,nombre,precio,descripcion){
      const producto = productos.find(item =>item.docId === docId);
      producto.nombre = nombre;
      producto.precio = precio;
      producto.descripcion = descripcion;
      await updateProducto(docId,producto);
    }

    async function handleLogout(auth){
      cerrarSesion(auth);
    }

    return(
      <PanelWrapper>
        <div>
          <h1>Dashboard</h1>
          <button onClick={handleLogout}>Sign Out</button>
        </div>

        <div>
          <form className="productForm" onSubmit={handleOnSubmit}>
            <div className="tituloform">
              <p>Sube tu producto</p>
            </div>

            <div className="nombrebox">
              <input
                type="text"
                onChange={handleOnChange}              
                name="nombre"
                placeholder="nombre del producto"
                className="inputForm"
              />
            </div>

            <div className="descripcionbox">
              <input
                type="text"
                onChange={handleOnChange}
                name="descripcion"
                placeholder="descripcion del producto"
                className="inputForm"
              />
            </div>

            <div className="preciobox">
              <input
                type="number"
                onChange={handleOnChange}
                name="precio"
                placeholder="precio del producto"
                className="inputForm"
              />
            </div>
            <button className="BotonPositivo" >Guardar</button>
          </form>

          <div>
            {
              productos.map((producto)=>(
                <Producto 
                key={producto.docId} 
                docId={producto.docId}
                nombre={producto.nombre} 
                descripcion={producto.descripcion} 
                precio={producto.precio} 
                onDelete={handleDeleteProducto} 
                onUpdate={handleUpdateProducto} />
              )
              )}
          </div>
        </div>
      </PanelWrapper>
    )
  

}
