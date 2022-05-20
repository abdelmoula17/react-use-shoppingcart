import React, { useEffect, useState } from "react";
import { alreadyInCart, totalPrice } from "../utils/helper";

export const guest_user_cart = "guest_user_cart";
export const cartContext = React.createContext<any>(null);

const CartContextProvider = ({ children }: any) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem(guest_user_cart) || "[]")
  );
  const [totalPriceCart, setTotalPriceCart] = useState(0);
  const [openCart, setOpenCart] = React.useState(false);
  useEffect(() => {
    setTotalPriceCart(() => totalPrice());
  }, []);

  const updateCart = (productId: any, quantity = 1) => {
    const existedProducts = JSON.parse(
      localStorage.getItem(guest_user_cart) || "[]"
    );
    const newCartItems = existedProducts.map((item: any) => {
      if (item.product.id === productId) {
        // eslint-disable-next-line no-param-reassign
        item.qty += quantity;
        return item;
      }
      return item;
    });
    localStorage.setItem(guest_user_cart, JSON.stringify([...newCartItems]));
    setTotalPriceCart(() => totalPrice());
  };

  const addToCart = (product: any, qty: number = 1) => {
    if (alreadyInCart(product)) {
      // update cart (increment quantity by One)
      updateCart(product.id, qty);
    } else {
      const existedProducts = JSON.parse(
        localStorage.getItem(guest_user_cart) || "[]"
      );
      localStorage.setItem(
        guest_user_cart,
        JSON.stringify([...existedProducts, { product, qty }])
      );
      setTotalPriceCart(() => totalPrice());
    }
    setCartItems(() =>
      JSON.parse(localStorage.getItem(guest_user_cart) || "[]")
    );
  };

  const removeFromCart = (productId: any) => {
    const existedProducts = JSON.parse(
      localStorage.getItem(guest_user_cart) || "[]"
    );
    const productToRemoveIndex = existedProducts.findIndex((item: any) => {
      return item.product.id === productId;
    });
    existedProducts.splice(productToRemoveIndex, 1);
    localStorage.setItem(guest_user_cart, JSON.stringify([...existedProducts]));
    setCartItems(() =>
      JSON.parse(localStorage.getItem(guest_user_cart) || "[]")
    );
    setTotalPriceCart(() => totalPrice());
  };

  const clearCart = () => {
    localStorage.clear();
    setCartItems(() =>
      JSON.parse(localStorage.getItem(guest_user_cart) || "[]")
    );
    setTotalPriceCart(() => totalPrice());
  };
  return (
    <cartContext.Provider
      value={{
        addToCart,
        cartItems,
        removeFromCart,
        totalPriceCart,
        setCartItems,
        openCart,
        setOpenCart,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
