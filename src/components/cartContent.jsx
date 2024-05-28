import React, { useState, useEffect } from 'react';
import Cart_item_table from "./cart_item_table";
import { getCartItemsByPageAndTitle } from '../service/cart';

export default function CartContent() {
    const [cartItems, setCartItems] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');

    const getCartItems = async () => {
        let res = await getCartItemsByPageAndTitle(pageIndex, pageSize, search);
        console.log(res);
        let loadTotal = res.data.size;
        let loadCartItems = res.data.cartItemDTOs;
        console.log(loadCartItems);
        setCartItems(loadCartItems);
        setTotal(loadTotal);
    }

    const handlePageChange = (page, size) => {
        setPageIndex(page);
        setPageSize(size);
    }

    useEffect(() => {
        getCartItems();
    }, [pageIndex, pageSize, search]);

    const handleSearch = async (value) => {
        setSearch(value);
        setPageIndex(1);
    };

    return (
        <Cart_item_table
            cartItems={cartItems}
            onMutate={getCartItems}
            handleSearch={handleSearch}
            pageIndex={pageIndex}
            pageSize={pageSize}
            total={total}
            onPageChange={handlePageChange}
        />
    );
}
