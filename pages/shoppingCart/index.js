import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import {
  ACTIONS,
  ShoppingCartContext,
  useShoppingCartContext,
} from '../../components/ShoppingCartContext';
import { shoppingCartStyles } from '../../styles/styles';
import cookies from '../../utils/cookies';

export default function ShoppingCart(props) {
  const [totalQuantity, setTotalQuantity] = useState();
  const { state, dispatch } = useContext(ShoppingCartContext);
  const shoppingCartContext = useShoppingCartContext();
  const [singleProduct, setSingleProduct] = useState({});
  const [shoppingCart, setShoppingCart] = useState(
    cookies.getCookiesClientSide('shoppingCart')
      ? JSON.parse(cookies.getCookiesClientSide('shoppingCart'))
      : props.shoppingCart,
  );
  const [sumOfSingleProduct, setSumOfSingleProduct] = useState(0);

  // Update single product in cart after changing quantity

  function updateSingleProductInCart(productId, newQuantity) {
    dispatch({
      type: ACTIONS.UPDATE_CART,
      payload: {
        shoppingCart: shoppingCart,
        newQuantity: newQuantity,
        productId: Number(productId),
      },
    });
    setTotalQuantity(cookies.updateCartTotalQuantity());
    dispatch({
      type: ACTIONS.GET_CART,
      payload: {
        shoppingCart: shoppingCart,
        additionalInfo: props.additionalInfo,
      },
    });
    console.log('state: ', state);
  }

  // Increasing/decreasing quantity

  function changeQuantityByClickHandler(event) {
    const id = Number(event.target.id.slice(1, event.target.id.length));
    const product = shoppingCart.find((element) => {
      return element.productId === id;
    });

    if (event.target.innerHTML === '+') {
      updateSingleProductInCart(id, product.quantity + 1);
    } else {
      if (product.quantity > 0) {
        updateSingleProductInCart(id, product.quantity - 1);
      }
    }
  }

  // Delete product from shopping cart

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
    // setSumOfSingleProduct(quantityOfSingleProduct * props.product.pricePerUnit);
  }, [singleProduct]);

  useEffect(() => {
    dispatch({
      type: ACTIONS.GET_CART,
      payload: {
        shoppingCart: shoppingCart,
        additionalInfo: props.additionalInfo,
      },
    });

    // setTotalQuantity(cookies.updateCartTotalQuantity());
    setTotalQuantity(cookies.updateCartTotalQuantity());
  }, []);

  return (
    <Layout>
      <div css={shoppingCartStyles}>
        <div>
          <Link href="/checkout/" key="checkout">
            <a>Go to checkout</a>
          </Link>
        </div>
        <div>
          {state.map((productInShoppingCart, index) => {
            return (
              <div key={index}>
                <div className="cartProductImage">
                  <Image
                    src={productInShoppingCart.imageData}
                    alt="Product image in cart"
                    height="244"
                    width="50"
                  />
                </div>
                <div key={productInShoppingCart.productName + index}>
                  {productInShoppingCart.productName}
                </div>
                <div>
                  <div css={shoppingCartStyles}>
                    <div>
                      <button
                        onClick={changeQuantityByClickHandler}
                        id={'-' + productInShoppingCart.productId}
                      >
                        -
                      </button>
                      <input value={productInShoppingCart.quantity} />
                      <button
                        onClick={changeQuantityByClickHandler}
                        id={'+' + productInShoppingCart.productId}
                      >
                        +
                      </button>
                    </div>
                    <div>Total: {sumOfSingleProduct.toFixed(2)}</div>
                    <button
                      onClick={deleteProductFromShoppingCartHandler}
                      id={productInShoppingCart.productId}
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const database = require('../../utils/database');
  let additionalInfo;
  let shoppingCart;
  if (context.req.cookies.shoppingCart) {
    additionalInfo = await database.getAdditionalInfoForCartItemsCookie(
      JSON.parse(context.req.cookies.shoppingCart),
    );

    shoppingCart = JSON.parse(context.req.cookies.shoppingCart);
  }

  return {
    props: {
      additionalInfo: additionalInfo || null,
      shoppingCart: shoppingCart || null,
    }, // will be passed to the page component as props
  };
}
