//Components
import Header from "./components/Header"
import Guitar from "./components/Guitar"



//Custom Hook
import { useCart } from "./hooks/useCart"

function App() {
  
  const {
    data,
    cart,
    addToCard,
    removeFromCart,
    decreaseQuantiy,
    increaseQuantiy,
    cleanCart,
    isEmpty,
    cartTotal
  }=useCart()


  return (
    <>
    <Header
     cart={cart}
     removeFromCart={removeFromCart}
     increaseQuantiy={increaseQuantiy}
     decreaseQuantiy={decreaseQuantiy}
     cleanCart={cleanCart}
     isEmpty={isEmpty}
     cartTotal={cartTotal}
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
