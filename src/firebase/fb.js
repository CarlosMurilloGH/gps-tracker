import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {getFirestore, collection, getDocs, doc, getDoc, query, where, setDoc, addDoc, deleteDoc} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDkyH0uECtH6cPEDvPbj1n553R5mQl92OE",
	authDomain: "catalogowspdemo.firebaseapp.com",
	databaseURL: "https://catalogowspdemo-default-rtdb.firebaseio.com",
	projectId: "catalogowspdemo",
	storageBucket: "catalogowspdemo.appspot.com",
	messagingSenderId: "596512282653",
	appId: "1:596512282653:web:474aadd73d6d254ba9cef4",
	measurementId: "G-JS8Q7ZRM96"
  };


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


//esto es con google
export async function userExists(uid){
	//buscamos en la base de datos, en la carpeta users el campo uid
    const docRef = doc(db,"users", uid);
	//mandamos a buscar el documento que tengan el uid con cierto valor
    const res = await getDoc(docRef);
    console.log(res);
	//firebase tiene la consulta exist, que nos retorna true or false
    return res.exists();
}

export async function existsTienda(tienda){
	const tiendas=[];
	//Definimos una constante de la colección en donde vamos a buscar
	const docsRef=collection(db,"tiendas");
	//Buscamos en firebase en donde tienda es igual a la tienda pasada
	const q = query(docsRef, where("tienda","==", tienda));
	//Vamos a tener un resultado de los documentos
	const querySnapshot = await getDocs(q);
  
	//obtenemos la información de los documentos
	querySnapshot.forEach((doc) =>{
        tiendas.push(doc.data());
	})
	// validamos que existan
	return tiendas.length > 0 ? tiendas[0].uid : null;
  }

  export async function registerNewUser(user){
	try {
		// Hacemos la constante en donde buscamos la colección users
		const collectionRef = collection(db, "users");
		// Le damos el nombre del usuario al documento
		const docRef = doc(collectionRef, user.uid);
		//Y guardamos la información de user en el documento user
		await setDoc(docRef, user);
	} catch (error) {
	  console.log(error)
	}
  }

  export async function updateUser(user){
	try {
		const collectionRef = collection(db,"users");
		const docRef=doc(collectionRef, user.uid);
		await setDoc(docRef,user);
	} catch (error) {
		
	}
  }

  export async function getUserInfo(uid){
	try {
		// Creamos la referencia hacia el documento 
		const docRef=doc(db, "users", uid);
		const document = await getDoc(docRef);
		return document.data();
	} catch (error) {
	  console.log(error)
	}
  }

  //functiones de productos

  export async function insertNewProducto(producto){
	try {
		const docRef= collection(db,"productos")
		const res = await addDoc(docRef,producto);
		return res;
	} catch (error) {
		console.log(error)
	}
  }

  export async function getProductos(uid){
	const productos= []
	try {
		//hacemos la referencia a la collecióm
		const collectionRef= collection(db,"productos");
		//hacemos la consulta, en donde where busca el campo uid que tiene el valor del uid pasado
		const q = query(collectionRef, where("uid", "==", uid));
		//getDocs nos trae un array de resultados
		const querySnapshot= await getDocs(q);

		// A cada documento retornado le añadimos el id automatico y lo agregamos al array de productos
		querySnapshot.forEach((doc) =>{
			const producto={...doc.data()};
			producto.docId = doc.id;
			productos.push(producto);
		});

		return productos;
	} catch (error) {
		console.error(error);
	}
  }

  //Como solo queremos encontrar 1 documento, lo buscamos dentro de la db productos con el docId pasado
  export async function updateProducto(docId, producto){
	try {
		const docRef= doc(db, "productos", docId);
		const res = await setDoc(docRef, producto);
		return res;
	} catch (error) {
		console.error(error);
	}
  }

  //Borramos el documento
  export async function DeleteProducto(docId){
	try {
		const docRef = doc(db,"productos", docId);
		const res = await deleteDoc(docRef);
		return res;
	} catch (error) {
		console.error(error);
	}
  }

  export async function setUserStorePhoto(uid,file){
	try {
		//la referencia de la ubicacion de la imagen, tiene como referencia a firestore y la direccion de la imagen con su nombre
		const imageRef = ref(storage,`images/${uid}`); 
		//le pasamos la referencia de la ubicacion y el archivo que subimos
		const resUpload = await uploadBytes(imageRef, file);
		return resUpload;
	} catch (error) {
		console.log(error);
	}
  }

  export async function getStorePhotoUrl(StorePicture){
	try {
		const imageRef = ref(storage,StorePicture);
		const url= await getDownloadURL(imageRef);
		return url;
	} catch (error) {
		console.log(error)
	}
  }

  export async function cerrarSesion(){
	await auth.signOut();
  }