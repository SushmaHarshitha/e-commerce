import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { QuerySnapshot, Timestamp, addDoc, collection, onSnapshot, orderBy, query ,deleteDoc , doc ,setDoc, getDocs} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';

function MyState(props) {
    
  const [mode , setMode] = useState('light');

  const toggleMode = () =>{
    if(mode == 'light'){
      setMode('dark')
      document.body.style.backgroundColor = "rgb(17 , 24 , 39)"
      document.body.style.color = "white"
    }else{
      setMode('light')
      document.body.style.backgroundColor = "white"
      document.body.style.color = "black"
    }
  }

  const [loading, setLoading] = useState(false)


  const [products , setProducts] = useState({
    title :null,
    price :null , 
    imageUrl :null,
    category :null,
    description :null,
    time : Timestamp.now(),
    date :new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
  })

  const addProduct = async () => {
    if(products.title===null || products.price===null || products.imageUrl===null || products.category===null || products.description===null){
      return toast.error('Please fill all the fields')
    }
    setLoading(true)
    try {

      const productRef = collection(fireDB , 'products')
      await addDoc(productRef , products)
      toast.success("Add Products Successfully")
    
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 8000);

      getProductData();
      setLoading(false)

    } catch (error) {
        console.log(error);
        setLoading(false)
    }
  }

  const [product , setProduct] = useState([])

  //get products------------------------------------------

  const getProductData = async () =>{

    setLoading(true)
    try {
      const q = query(
        collection(fireDB , 'products'),
        orderBy('time')
      )
      const data = onSnapshot(q , (QuerySnapshot) => {
        let productsArray = []
        QuerySnapshot.forEach((doc) => {
          productsArray.push({...doc.data() , id:doc.id})
        });
        setProduct(productsArray)
        setLoading(false)
      });

      return () => data

    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

 

  //update product function

  const edithandle = (item) =>{
    setProducts(item)
  }

  const updateProduct = async (item) => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB , "products" , products.id) , products)
      toast.success("Product Updated Successfully")
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 8000);
      getProductData();
      setLoading(false)
      

    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  //delete product 

 
  const deleteProduct = async (item) => {

    try {
      setLoading(true)
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Product Deleted successfully')
      setLoading(false)
      getProductData()
    } catch (error) {
      // toast.success('Product Deleted Falied')
      setLoading(false)
    }
  }


   //get order date

   const [order, setOrder] = useState([]);

   const getOrderData = async () => {
     setLoading(true)
     try {
       const result = await getDocs(collection(fireDB, "order"))
       const ordersArray = [];
       result.forEach((doc) => {
         ordersArray.push(doc.data());
         setLoading(false)
       });
       setOrder(ordersArray);
       console.log(ordersArray)
       setLoading(false);
     } catch (error) {
       console.log(error)
       setLoading(false)
     }
   }

   ///////////////////////////  user data /////////////////////////////////////////////////////

   const [user, setUser] = useState([]);

   const getUserData = async () => {
     setLoading(true)
     try {
       const result = await getDocs(collection(fireDB, "users"))
       const usersArray = [];
       result.forEach((doc) => {
         usersArray.push(doc.data());
         setLoading(false)
       });
       setUser(usersArray);
       console.log(usersArray)
       setLoading(false);
     } catch (error) {
       console.log(error)
       setLoading(false)
     }
   }

    useEffect(() => {
      getProductData();
      getOrderData()
      getUserData();
    } , [] );


    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')


  return (
    <MyContext.Provider value={{
        mode , toggleMode , loading , setLoading ,
        products , setProducts , addProduct , product , 
           edithandle , updateProduct , deleteProduct , order ,user ,
           searchkey, setSearchkey,filterType, setFilterType,
           filterPrice, setFilterPrice
      }}>
        {props.children}
    </MyContext.Provider>
  )
}

export default MyState;