//Dependencies
import { useState, useEffect} from "react"

//Components
import Header from "./components/Header"
import Guitar from "./components/Guitar"

//Data
import { db } from "./data/db"

function App() {
  
  const initialCart=()=>{
    const localStorageCart=localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart):[]
  }

  const [data]=useState(db)
  const [cart,setCart]=useState(initialCart)

  const MAX_ITEM=5;
  const MIN_ITEM=1

  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart))
  },[cart])
 
  function addToCard(item){
    const itemExits=cart.findIndex(guitar=>guitar.id ===item.id)
    
    if(itemExits>=0){
      if(cart[itemExits].quantity >= MAX_ITEM) return
      const updatedCart=[...cart]
      updatedCart[itemExits].quantity++
      setCart(updatedCart)
    }else{
      item.quantity=1
      setCart([...cart,item])
    }

  }

  function removeFromCart(id){
   setCart(prevCart=> prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantiy(id) {
    const updatedCart= cart.map(item=>{
      if(item.id===id && item.quantity<MAX_ITEM){
        return {
          ...item,
          quantity:item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart);
  }

  function decreaseQuantiy(id) {
    const updatedCart= cart.map(item=>{
      if(item.id===id && item.quantity>MIN_ITEM){
        return {
          ...item,
          quantity:item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart);
  }

  function cleanCart(){
    setCart([])
  }




  return (
    <>
    <Header
     cart={cart}
     removeFromCart={removeFromCart}
     increaseQuantiy={increaseQuantiy}
     decreaseQuantiy={decreaseQuantiy}
     cleanCart={cleanCart}
    />
      
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar)=>(
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCard={addToCard}
            />
          ))}
          
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
     
    </>
  )
}

export default App
