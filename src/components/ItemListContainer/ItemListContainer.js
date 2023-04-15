import "../ItemListContainer/ItemListContainer.scss";
// import { Button } from 'react-bootstrap';
// import ItemCount from '../ItemCount/ItemCount';
import { useEffect, useState } from "react";
// import{pedirDatos} from '../../helpers/pedirDatos';
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom";
// import { Spinner } from "react-bootstrap";
import { Loading } from "../Loading/Loading";
import {Error404} from '../Error404/Error404';
// import {Carga} from '../Carga/Carga'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config"


export const ItemListContainer = ({item}) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true)


  const {categoryId} = useParams()

  useEffect(() => {
    setLoading(true)
    // 1 armar una referencia sincornico
    const productosRef = collection(db,"productos")
    const q = categoryId
              ?    query(productosRef, where("category","==",categoryId))
              : productosRef

    //2 llamar a la referencia asincronico
    getDocs(q)
    .then((res) =>{
      setProductos(res.docs.map((doc) => {
        return {
          id : doc.id,
          ...doc.data()
        }
      }))
    })
    .finally(() => setLoading(false))

  }, [categoryId]);

  return (
    <div >

     { loading
     ? <Loading/>
     : (productos.length>0)>0?<ItemList  items= {productos} items2={categoryId?categoryId:item}/>:<Error404/>
     }


  

      {/* <p>{greeting}</p> */}
      {/* <button className="btn btn-primary">Click</button> */}
      {/* <Button>Click </Button> */}
      {/* <ItemCount   initial={1} stock={7} /> */}
    </div>
  );
};
