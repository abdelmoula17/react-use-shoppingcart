import { useContext } from 'react';
import { cartContext } from '../cartContext/cartContext';
export const useCart = () => {
  const hanldeCart = useContext(cartContext);
  return hanldeCart;
};
