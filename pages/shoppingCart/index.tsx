import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import Layout, { LoggedInUserType } from '../../components/Layout';
import {
  increaseDecreaseButtonStyles,
  shoppingCartStyles,
} from '../../styles/styles';
import { ACTIONS } from '../../utils/cartContextHelper';
import * as cookies from '../../utils/cookies';
import { shoppingCartContext } from '../../utils/ShoppingCartContext';
import { CheckoutShoppingCartPropsType } from '../checkout/index';

type ProductInShoppingCartType = {
  imageData: string;
  productId: number;
  productName: string;
  quantity: number;
  pricePerUnit: number;
};

type AdditionalInfoType = {
  productId: number;
  productName: string;
  pricePerUnit: number;
  imageId: number;
  imageData: string;
};

type ShoppingCartPropsType = {
  shoppingCart: CheckoutShoppingCartPropsType;
  loggedInUser: LoggedInUserType;
  additionalInfo: AdditionalInfoType;
};

export default function ShoppingCart(props: ShoppingCartPropsType) {
  // States and Contexts
  const [shoppingCart] = useState(
    cookies.getCookiesClientSide('shoppingCart')
      ? JSON.parse(cookies.getCookiesClientSide('shoppingCart') as string)
      : props.shoppingCart,
  );
  // const [totalQuantity, setTotalQuantity] = useState();
  const { state, dispatch } = useContext(shoppingCartContext);
  // Update single product in cart after changing quantity

  function updateSingleProductInCart(productId: number, newQuantity: number) {
    dispatch({
      type: ACTIONS.UPDATE_CART,
      payload: {
        shoppingCart: shoppingCart,
        newQuantity: newQuantity,
        productId: Number(productId),
      },
    });
    cookies.updateCartTotalQuantity();
    dispatch({
      type: ACTIONS.ADD_ADDITIONAL_INFO_TO_CART,
      payload: {
        shoppingCart: shoppingCart,
        additionalInfo: props.additionalInfo,
      },
    });
  }

  // Increasing/decreasing quantity

  function changeQuantityByClickHandler(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    const id = Number(
      (event.target as HTMLButtonElement).id.slice(
        1,
        (event.target as HTMLButtonElement).id.length,
      ),
    );
    const product = shoppingCart.find((element: ProductInShoppingCartType) => {
      return element.productId === id;
    });

    if ((event.target as HTMLButtonElement).innerHTML === '+') {
      updateSingleProductInCart(id, product.quantity + 1);
    } else {
      if (product.quantity > 0) {
        updateSingleProductInCart(id, product.quantity - 1);
      }
    }
  }

  // Delete product from shopping cart

  function deleteProductFromShoppingCartHandler(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    dispatch({
      type: ACTIONS.DELETE_FROM_CART,
      payload: {
        shoppingCart: shoppingCart,
        deletedItemId: (event.target as HTMLButtonElement).id,
        currentState: state,
      },
    });
  }

  // After mount

  useEffect(() => {
    dispatch({
      type: ACTIONS.ADD_ADDITIONAL_INFO_TO_CART,
      payload: {
        shoppingCart: shoppingCart,
        additionalInfo: props.additionalInfo,
      },
    });
    cookies.updateCartTotalQuantity();
  }, [dispatch, props.additionalInfo, shoppingCart]);

  return (
    <Layout loggedInUser={props.loggedInUser}>
      <div css={shoppingCartStyles}>
        <div className="checkButton">
          {state.length !== 0 ? (
            <Link href="/checkout/" key="checkout">
              <a data-cy="goToCheckoutButton">Go to checkout</a>
            </Link>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <div>
          {state.map(
            (
              productInShoppingCart: ProductInShoppingCartType,
              index: number,
            ) => {
              return (
                <div key={index} className="shoppingCartProduct">
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
                  <div className="quantitySumAndDelete">
                    <div>
                      <button
                        css={increaseDecreaseButtonStyles}
                        data-cy="decreaseQuantityInShoppingCart"
                        onClick={changeQuantityByClickHandler}
                        id={'-' + productInShoppingCart.productId}
                      >
                        -
                      </button>
                      <input
                        data-cy="quantityInShoppingCart"
                        value={productInShoppingCart.quantity}
                      />
                      <button
                        css={increaseDecreaseButtonStyles}
                        data-cy="increaseQuantityInShoppingCart"
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
                      data-cy="deleteProductFromShoppingCart"
                      onClick={deleteProductFromShoppingCartHandler}
                      id={String(productInShoppingCart.productId)}
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
              );
            },
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const database = require('../../utils/database');
  const nextCookies = require('next-cookies');
  let additionalInfo;
  let shoppingCart;

  const token = nextCookies(context).token;
  let loggedInUser;

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

  console.log('additional info: ', additionalInfo);
  console.log('shopping cart: ', shoppingCart);
  console.log('loggedInUser: ', loggedInUser);

  return {
    props: {
      additionalInfo: additionalInfo || null,
      shoppingCart: shoppingCart || null,
      loggedInUser: loggedInUser || null,
    }, // will be passed to the page component as props
  };
}
