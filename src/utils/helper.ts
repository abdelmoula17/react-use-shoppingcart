import { guest_user_cart } from "../cartContext/cartContext";
export const alreadyInCart = (product: any) => {
  const existedProducts = JSON.parse(
    localStorage.getItem(guest_user_cart) || "[]"
  );
  const found = existedProducts.find(
    (item: any) => item.product.id === product.id
  );
  return !!found;
};

export const totalPrice = () => {
  const existedProducts = JSON.parse(
    localStorage.getItem(guest_user_cart) || "[]"
  );
  let sum = 0;
  existedProducts.forEach((element: any) => {
    sum += element.product?.attributes?.price * element.qty;
  });
  return sum;
};
