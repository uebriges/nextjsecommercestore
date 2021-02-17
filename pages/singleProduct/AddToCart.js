import { useEffect, useState } from 'react';
import cookies from '../../utils/cookies';

export default function AddToCart(props) {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  function changeQuantityByClickHandler(event) {
    if (event.target.innerHTML === '+') {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity > 0 ? quantity - 1 : 0);
    }
  }

  function changeQuantityByInputHandler(event) {
    setQuantity(Number(event.target.value));
  }

  function addToCart(event) {
    // Check if product id already available in cookies
    // If true -> get value, add quantity, write new quantity into cookie
    // if false -> write quantity into cookie
    //cookies.getCookiesServerSide('shoppingCart');
    if (cookies.getCookiesClientSide('shoppingCart')) {
      const productsInCookiesArray = JSON.parse(
        cookies.getCookiesClientSide('shoppingCart'),
      );
      const product = productsInCookiesArray.find(
        (element) => element.productId === props.product.productId,
      );
      if (product) {
        product.quantity = product.quantity + quantity;
        productsInCookiesArray.map((element) =>
          element.productId === product.productId ? product : element,
        );
        cookies.setCookiesClientSide(
          'shoppingCart',
          JSON.stringify(productsInCookiesArray),
        );
      } else {
        productsInCookiesArray.push({
          productId: props.product.productId,
          quantity: quantity,
        });
        cookies.setCookiesClientSide(
          'shoppingCart',
          JSON.stringify(productsInCookiesArray),
        );
      }
    } else {
      const shoppingCartEntry = {
        productId: props.product.productId,
        quantity: quantity,
      };
      cookies.setCookiesClientSide(
        'shoppingCart',
        JSON.stringify([shoppingCartEntry]),
      );
    }
    setQuantity(0);
  }

  useEffect(() => {
    setTotal(quantity * props.product.pricePerUnit);
  }, [quantity, props.product.pricePerUnit]);

  return (
    <>
      <div>
        <button onClick={changeQuantityByClickHandler}>-</button>
        <input
          type="text"
          value={quantity}
          onChange={changeQuantityByInputHandler}
        />
        <button onClick={changeQuantityByClickHandler}>+</button>
      </div>
      <div>Total: {total.toFixed(2)}</div>
      <div>
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </>
  );
}
