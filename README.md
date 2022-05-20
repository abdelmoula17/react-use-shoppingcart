# react-use-shoppingcart 🛒

A light weight custom hook for handling shopping cart logic, and make youre life easier .

## Features

- 💳 Not tied to any payment gateway, or checkout - create your own!
- 🔥 Persistent carts with local storage.
- ⭐️ Supports multiples carts per page
- 🛒 Flexible cart item schema
- 🥞 Works with Next, React
- 🛠 Built with TypeScript
- ✅ Fully tested

## Usage/Examples

### app.js

```javascript
import { CartContextProvider } from 'react-use-shoppingcart';
import Navbar from './components/navbar';
import Product from './components/product';
import Cart from './components/cart';
function App() {
  return (
    <div className="App">
      <CartContextProvider>
        <Navbar />
        <Cart />
        <Product />
      </CartContextProvider>
    </div>
  );
}
```

### product.js

```javascript
import { useCart } from "react-use-shoppingcart";

const products = [
    {
      id: 1,
      name: "jacket",
      price: 500,
      image: "path/to/image"
      ...
    },
     {
      id: 2,
      name: "jeans",
      price: 100,
      image: "path/to/image"
      ...
    },
    {
      id: 3,
      name: "t-shirt",
      price: 254,
      image: "path/to/image"
      ...
    },
  ];
  const Product = () => {
      const { addToCart } = useCart();
      return (
        <div className="container">
          {products.map((product) => {
            return (
              <div className="card" key={product.id}>
                <img
                  src={product.image}
                  alt="product image"
                />
                <h1>{product.name}</h1>
                <p className="price">{product.price}$</p>
                <p>
                  <button onClick={() => addToCart(product)}>Add to Cart</button>
                </p>
              </div>
            );
          })}
        </div>
      );
}
export default Product;
```

### cart.js

```javascript
const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalPriceCart } = useCart();
  return (
    <div>
      <div className="cartContainer">
        {cartItems.map(item => {
          return (
            <div className="cart" key={item.product.id}>
              <div>
                <div>
                  {item.product.name} - {item.product.price}$: - qty:
                  {item.qty}
                </div>
              </div>
              <div>
                <div>
                  <button onClick={() => removeFromCart(item.product.id)}>
                    remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <div>Total : {totalPriceCart}</div>
        <button onClick={clearCart}>clear</button>
      </div>
    </div>
  );
};

export default Cart;
```

## Documentation

#### `addToCart (product,quatity = 1)`

the `addToCart` function will add the product to the cart, and accept an optional `quatity` param with a default value of `1`.

#### `removeFromCart (productId)`

the `removeFromCart` function will remove the product from the cart.

#### `clearCart ()`

the `clearCart` function will clear the cart.

#### `cartItems []`

the `cartItems` is an array of the existed products in the cart.

#### `totalPriceCart`

the `totalPriceCart` is the total price of the existed products in the cart.

## Contributing

Contributions are always welcome!
