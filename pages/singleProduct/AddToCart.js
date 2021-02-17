import { useEffect, useState } from 'react';
import cookies from '../../utils/cookies';

export default function AddToCart(props) {
  const [quantityOfSingleProduct, setQuantityOfSingleProduct] = useState(0);
  const [totalOfSingleProduct, setTotalOfSingleProduct] = useState(0);

  function changeQuantityByClickHandler(event) {
    if (event.target.innerHTML === '+') {
      setQuantityOfSingleProduct(quantityOfSingleProduct + 1);
    } else {
      setQuantityOfSingleProduct(
        quantityOfSingleProduct > 0 ? quantityOfSingleProduct - 1 : 0,
      );
    }
  }

  function changeQuantityByInputHandler(event) {
    setQuantityOfSingleProduct(Number(event.target.value));
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
        product.quantity = product.quantity + quantityOfSingleProduct;
        productsInCookiesArray.map((element) =>
          element.productId === product.productId ? product : element,
        );
        cookies.setCookiesClientSide(
          'shoppingCart',
          JSON.stringify(productsInCookiesArray),
        );
        // props.setTotalQuantity(cookies.updateCartTotalQuantity());
      } else {
        productsInCookiesArray.push({
          productId: props.product.productId,
          quantity: quantityOfSingleProduct,
        });
        cookies.setCookiesClientSide(
          'shoppingCart',
          JSON.stringify(productsInCookiesArray),
        );
        // props.setTotalQuantity(cookies.updateCartTotalQuantity());
      }
    } else {
      const shoppingCartEntry = {
        productId: props.product.productId,
        quantity: quantityOfSingleProduct,
      };
      cookies.setCookiesClientSide('shoppingCart', [shoppingCartEntry]);
      // props.setTotalQuantity(cookies.updateCartTotalQuantity());
    }
    setQuantityOfSingleProduct(0);
  }

  useEffect(() => {
    setTotalOfSingleProduct(
      quantityOfSingleProduct * props.product.pricePerUnit,
    );
  }, [quantityOfSingleProduct, props.product.pricePerUnit]);

  return (
    <>
      <div>
        <button onClick={changeQuantityByClickHandler}>-</button>
        <input
          type="text"
          value={quantityOfSingleProduct}
          onChange={changeQuantityByInputHandler}
        />
        <button onClick={changeQuantityByClickHandler}>+</button>
      </div>
      <div>Total: {totalOfSingleProduct.toFixed(2)}</div>
      <div>
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </>
  );
}
