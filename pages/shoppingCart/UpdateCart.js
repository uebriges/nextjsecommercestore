import { useEffect, useState } from 'react';
import cookies from '../../utils/cookies';

export default function UpdateCart(props) {
  const [quantityOfSingleProduct, setQuantityOfSingleProduct] = useState(
    props.product.quantity,
  );
  const [sumOfSingleProduct, setSumOfSingleProduct] = useState(0);

  function updateSingleProductInCart(newQuantity) {
    // Check if product id already available in cookies
    // If true -> get value, add quantity, write new quantity into cookie
    // if false -> write quantity into cookie

    // Shopping cart cookie exists already
    if (cookies.getCookiesClientSide('shoppingCart')) {
      const productsInCookiesArray = JSON.parse(
        cookies.getCookiesClientSide('shoppingCart'),
      );
      // Find the specific product with the productId in the shopping cart.
      const product = productsInCookiesArray.find(
        (element) => element.productId === props.product.productId,
      );
      // If that product is already in the shopping cart...
      if (product) {
        product.quantity = newQuantity;
        productsInCookiesArray.map((element) =>
          element.productId === product.productId ? product : element,
        );
        cookies.setCookiesClientSide(
          'shoppingCart',
          JSON.stringify(productsInCookiesArray),
        );
        props.setTotalQuantity(cookies.updateCartTotalQuantity());
        cookies.updateCartTotalQuantity();
        // if product is not yet in the shopping cart...
      } else {
        productsInCookiesArray.push({
          productId: props.product.productId,
          quantity: newQuantity,
        });
        cookies.setCookiesClientSide(
          'shoppingCart',
          JSON.stringify(productsInCookiesArray),
        );
        props.setTotalQuantity(cookies.updateCartTotalQuantity());
        cookies.updateCartTotalQuantity();
      }
      // Shopping cart cookies doesn't exist yet...
    } else {
      const shoppingCartEntry = {
        productId: props.product.productId,
        quantity: newQuantity,
      };
      cookies.setCookiesClientSide('shoppingCart', [shoppingCartEntry]);
      props.setTotalQuantity(cookies.updateCartTotalQuantity());
      cookies.updateCartTotalQuantity();
    }
    //    setQuantityOfSingleProduct(0);
  }

  function changeQuantityByClickHandler(event) {
    if (event.target.innerHTML === '+') {
      setQuantityOfSingleProduct(quantityOfSingleProduct + 1);
      updateSingleProductInCart(quantityOfSingleProduct + 1);
    } else {
      setQuantityOfSingleProduct(
        quantityOfSingleProduct > 0 ? quantityOfSingleProduct - 1 : 0,
      );
      updateSingleProductInCart(
        quantityOfSingleProduct > 0 ? quantityOfSingleProduct - 1 : 0,
      );
    }
  }

  function changeQuantityByInputHandler(event) {
    setQuantityOfSingleProduct(Number(event.target.value));
    updateSingleProductInCart(Number(event.target.value));
  }

  useEffect(() => {
    setSumOfSingleProduct(quantityOfSingleProduct * props.product.pricePerUnit);
  }, [quantityOfSingleProduct]);

  return (
    <>
      <div>
        <button onClick={changeQuantityByClickHandler}>-</button>
        <input
          value={quantityOfSingleProduct}
          onChange={changeQuantityByInputHandler}
        />
        <button onClick={changeQuantityByClickHandler}>+</button>
      </div>
      <div>Total: {sumOfSingleProduct.toFixed(2)}</div>
      {/* <div>
        <button onClick={updateSingleProductInCart}>Update cart</button>
      </div> */}
    </>
  );
}
