import React, { useState,useEffect } from 'react';
import Cart_item_table from "./cart_item_table";
import { getAllCartItems} from '../service/cart';

export default function CartContent() {
    const [cartItems, setCartItems] = useState([]);

    const initCartItems = async () => {
        let loadCartItems = await getAllCartItems();
        setCartItems(loadCartItems);
        console.log("loadCartItems",loadCartItems);
    }

    useEffect(() => {
        // console.log("there is a change",cartItems);
        initCartItems();
    }, []);
    //onMutate
    return (
        <Cart_item_table cartItems={cartItems} onMutate={initCartItems} />
    );
}