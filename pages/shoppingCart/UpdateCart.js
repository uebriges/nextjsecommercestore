import { useContext, useEffect, useState } from 'react';
import {
  ACTIONS,
  ShoppingCartContext,
} from '../../components/ShoppingCartContext';
import { shoppingCartStyles } from '../../styles/styles';
import cookies from '../../utils/cookies';

export default function UpdateCart(props) {
  const [quantityOfSingleProduct, setQuantityOfSingleProduct] = useState(
    props.product.quantity,
  );
  const [sumOfSingleProduct, setSumOfSingleProduct] = useState(0);
  const { dispatch } = useContext(ShoppingCartContext);

  function updateSingleProductInCart(newQuantity) {
    dispatch({
      type: ACTIONS.UPDATE_CART,
      payload: {
        shoppingCart: JSON.parse(cookies.getCookiesClientSide('shoppingCart')),
        newQuantity: newQuantity,
        productId: props.product.productId,
      },
    });
    props.setTotalQuantity(cookies.updateCartTotalQuantity());
  }

  function changeQuantityByClickHandler(event) {
    if (event.target.innerHTML === '+') {
      setQuantityOfSingleProduct(quantityOfSingleProduct + 1);
      updateSingleProductInCart(quantityOfSingleProduct + 1);
    } else {
      setQuantityOfSingleProduct(
        quantityOfSingleProduct > 1 ? quantityOfSingleProduct - 1 : 1,
      );
      updateSingleProductInCart(
        quantityOfSingleProduct > 1 ? quantityOfSingleProduct - 1 : 1,
      );
    }
  }

  function changeQuantityByInputHandler(event) {
    setQuantityOfSingleProduct(Number(event.target.value));
    updateSingleProductInCart(Number(event.target.value));
  }

  function deleteProductFromShoppingCartHandler(event) {
    console.log('deletion');
    dispatch({
      type: ACTIONS.DELETE_FROM_CART,
      payload: {
        shoppingCart: JSON.parse(cookies.getCookiesClientSide('shoppingCart')),
        deletedItemId: event.target.id,
      },
    });
  }

  useEffect(() => {
    setSumOfSingleProduct(quantityOfSingleProduct * props.product.pricePerUnit);
  }, [quantityOfSingleProduct]);

  return (
    <div css={shoppingCartStyles}>
      <div>
        <button onClick={changeQuantityByClickHandler}>-</button>
        <input
          value={quantityOfSingleProduct}
          onChange={changeQuantityByInputHandler}
        />
        <button onClick={changeQuantityByClickHandler}>+</button>
      </div>
      <div>Total: {sumOfSingleProduct.toFixed(2)}</div>
      <button
        onClick={deleteProductFromShoppingCartHandler}
        id={props.product.productId}
      >
        Delete
        {/* <Image
          src="/deleteButton.svg"
          height="20"
          width="20"
          onclick={deleteProductFromShoppingCartHandler}
        /> */}
      </button>
    </div>
  );
}

export function getServerSideProps(context) {
  console.log('context: ', context);
}
