import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { shoppingCartStyles } from '../../styles/styles';
import cookies from '../../utils/cookies';
import { ACTIONS, ShoppingCartContext } from '../../utils/ShoppingCartContext';

export default function ShoppingCart(props) {
  // States and Contexts
  const [shoppingCart, setShoppingCart] = useState(
    cookies.getCookiesClientSide('shoppingCart')
      ? JSON.parse(cookies.getCookiesClientSide('shoppingCart'))
      : props.shoppingCart,
  );
  const [totalQuantity, setTotalQuantity] = useState();
  const { state, dispatch } = useContext(ShoppingCartContext);
  console.log('state after declaration: ', state);
  // Update single product in cart after changing quantity

  function updateSingleProductInCart(productId, newQuantity) {
    const teset = dispatch({
      type: ACTIONS.ADD_ADDITIONAL_INFO_TO_CART,
      payload: {
        shoppingCart: shoppingCart,
        newQuantity: newQuantity,
        productId: Number(productId),
      },
    });
    console.log('test: ', teset);
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
    const test = dispatch({
      type: ACTIONS.DELETE_FROM_CART,
      payload: {
        shoppingCart: shoppingCart,
        deletedItemId: event.target.id,
        currentState: state,
      },
    });
    console.log('test delete: ', test);
    console.log('State after deletion: ', state);
    console.log('shopping cart after deletion: ', state);
  }

  // After mount

  useEffect(() => {
    console.log('use effect');
    dispatch({
      type: ACTIONS.GET_CART,
      payload: {
        shoppingCart: shoppingCart,
        additionalInfo: props.additionalInfo,
      },
    });
    setTotalQuantity(cookies.updateCartTotalQuantity());
  }, [dispatch, props.additionalInfo, shoppingCart]);

  return (
    <Layout loggedInUser={props.loggedInUser}>
      <div css={shoppingCartStyles}>
        <div>
          {state.length !== 0 ? (
            <Link href="/checkout/" key="checkout">
              <a>Go to checkout</a>
            </Link>
          ) : (
            'Your cart is empty'
          )}
        </div>
        <div>
          {state.map((productInShoppingCart, index) => {
            return (
              <div key={index}>
                <div className="cartProductImage">
                  <Link
                    href={'/singleProduct/' + productInShoppingCart.productId}
                  >
                    <a>
                      <Image
                        src={productInShoppingCart.imageData}
                        alt="Product image in cart"
                        height="244"
                        width="50"
                      />
                    </a>
                  </Link>
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
                    <div>
                      Total:
                      {productInShoppingCart.quantity *
                        productInShoppingCart.pricePerUnit}
                    </div>
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
  const nextCookies = require('next-cookies');
  let additionalInfo;
  let shoppingCart;

  const token = nextCookies(context).token;
  let loggedInUser;

  console.log('single product: token', token);
  if (token) {
    loggedInUser = (await database.getUserByToken(token))[0];
  } else {
    loggedInUser = null;
  }

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
      loggedInUser: loggedInUser || null,
    }, // will be passed to the page component as props
  };
}
