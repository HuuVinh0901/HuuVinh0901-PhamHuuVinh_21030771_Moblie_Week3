import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const updateItemQuantity = (key, quantity) => {
        setCart(prevCart => {
            
            if (quantity < 1) {
                return prevCart.filter(item => item.key !== key);
            } else {
                
                return prevCart.map(item =>
                    item.key === key ? { ...item, sl: quantity } : item
                );
            }
        });
    };
    const addToCart = (item) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(cartItem => cartItem.key === item.key);
            if (existingItemIndex > -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].sl += 1;
                return updatedCart;
            } else {
                return [...prevCart, { ...item, sl: 1 }];
            }
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart ,updateItemQuantity}}>
            {children}
        </CartContext.Provider>
    );
};
