import React from "react";
import {Offcanvas, Stack} from 'react-bootstrap'
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../util/formatCurrency";
import { CartItem } from "./CartItem";
import storeItem from '../data/items.json'

type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({isOpen}: ShoppingCartProps) {
    const {closeCart, cartItems} = useShoppingCart()

    return(
        <>
            {/* Offcanvas is from bootstrap that will implement a nice slide-in effect */}
            <Offcanvas show={isOpen} onHide={closeCart} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* Stack is a really good way to stack things together either vertically or horizontally */}
                    <Stack gap={3}>
                        {cartItems.map(item => (
                            <CartItem key={item.id} {...item}/>
                        ))}
                        <div className="ms-auto fw-bold fs-5">
                            Total: {formatCurrency(
                                cartItems.reduce((total, cartItem) => {
                                    const item = storeItem.find(item => item.id === cartItem.id)
                                    return total + (item?.price || 0) * cartItem.quantity
                                }, 0))}
                        </div>
                    </Stack>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}