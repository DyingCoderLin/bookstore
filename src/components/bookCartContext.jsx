import React, { createContext, useState } from "react";

// 创建一个Context对象
export const BookCartContext = createContext();

export default function BookCart({ children }) {
    const [myBookCart, setBookCart] = useState([]); // 存储被加入购物车的书籍

    // 添加书籍到购物车
    const addToCart = (book) => {
        // 检查购物车中是否已存在相同的书籍
        alert(`书籍 ${book.title} 被加入到购物车了`);
        const existingBookIndex = myBookCart.findIndex(item => item.id === book.id);
        if (existingBookIndex !== -1) {
            // 如果已存在相同的书籍，更新其数量
            const updatedCart = [...myBookCart];
            updatedCart[existingBookIndex].quantity += 1;
            setBookCart(updatedCart);
        } else {
            // 如果购物车中不存在相同的书籍，添加新的书籍到购物车
            setBookCart(prevCart => [...prevCart, { ...book, quantity: 1 }]);
        }

    };

    // 从购物车中移除书籍
    const removeFromCart = (bookId) => {
        setBookCart(prevCart => prevCart.filter(item => item.id !== bookId));
        //alert("进行删除");
    };

    // 清空购物车
    const clearCart = () => {
        setBookCart([]);
        alert(`购物车被清空了`);
    };

    return (
        <BookCartContext.Provider value={{ myBookCart, addToCart, removeFromCart, clearCart }}>
            {children}
        </BookCartContext.Provider>
    );
}
