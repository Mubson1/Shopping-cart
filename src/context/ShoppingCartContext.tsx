import { createContext, ReactNode, useContext, useState } from "react";
import React from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

//in typescript, every props should be declared with its datatype and ReactNode is a datatype for components
type CartItem = {
    id: number
    quantity: number
}    
type ShoppingCartProviderProps = {
    children: ReactNode
}
type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    // type of CartItem is defined above
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])

    const openCart = () => setIsOpen(true)

    const closeCart = () => setIsOpen(false)

    //what we did is find the total of all the items' quantities from our cart
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        setCartItems(currentItems => {
            //if we don't have the thing in our cart then  below if statement is true as its value will be null. So, in the current cartItems state, we are adding the quantity
            if(currentItems.find(item => item.id === id) == null) {
                return [...currentItems, { id, quantity: 1}]
            } 
            //if we already have the item in our cart, then upon increase, we don't need to add that to our cart just increase the value
            else{
                return currentItems.map(item => {
                    //if the id matches the id of the product in our store, then increase the item quantity in cart for that product
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else{
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currentItems => {
            //if we want to delete the item whose quantity is only 1 in our cart, we want to remove that item from our cart instead of decreasing its quantity
            if(currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !==id)
            } else{
                return currentItems.map(item => {
                    //if the id matches the id of the product in our store, then decrease the item quantity in cart for that product
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else{
                        return item
                    }
                })
            }
        })
    }   

    function removeFromCart(id:number) {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !==id)
        })
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                cartQuantity,
                cartItems,
                openCart,
                closeCart
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}