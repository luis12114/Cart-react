//Dependencies
import { useState, useEffect} from "react"
import { useMemo } from "react";

//Data
import { db } from "../data/db"

export const useCart = () => {
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEM = 5;
    const MIN_ITEM = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCard(item) {
        const itemExits = cart.findIndex(guitar => guitar.id === item.id)

        if (itemExits >= 0) {
            if (cart[itemExits].quantity >= MAX_ITEM) return
            const updatedCart = [...cart]
            updatedCart[itemExits].quantity++
            setCart(updatedCart)
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }

    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantiy(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEM) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart);
    }

    function decreaseQuantiy(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEM) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart);
    }

    function cleanCart() {
        setCart([])
    }


    //State Derivado
    const isEmpty=useMemo(()=>cart.length===0,[cart])

    const cartTotal = useMemo( () => cart.reduce((total, item) => total + (item.quantity * item.price), 0),[cart])

    return {
      data,
      cart,
      addToCard,
      removeFromCart,
      decreaseQuantiy,
      increaseQuantiy,
      cleanCart,
      isEmpty,
      cartTotal
    }

}