import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import {
  ACTIONS,
  ShoppingCartContext,
  useShoppingCartContext,
} from '../../components/ShoppingCartContext';
import { shoppingCartStyles } from '../../styles/styles';
import cookies from '../../utils/cookies';
import UpdateCart from './UpdateCart';

export default function ShoppingCart(props) {
  const router = useRouter();
  const [totalQuantity, setTotalQuantity] = useState();
  const { state, dispatch } = useContext(ShoppingCartContext);
  // const shoppingCart = props.shoppingCart;
  const shoppingCartContext = useShoppingCartContext();
  console.log('Router in shoppingcart: ', router);
  // console.log(
  //   'shopping cart from client side cookies: ',
  //   JSON.parse(cookies.getCookiesClientSide('shoppingCart')),
  // );
  console.log('additional info from server side db: ', props.additionalInfo);
  console.log('shopping cart from server side: ', props.shoppingCart);
  console.log('state before: ', state);

  if (props.shoppingCart) {
    shoppingCartContext.dispatch({
      type: ACTIONS.GET_CART,
      payload: {
        shoppingCart: props.shoppingCart,
        additionalInfo: props.additionalInfo,
      },
    });
  } else {
    shoppingCartContext.dispatch({
      type: ACTIONS.GET_CART,
      payload: {
        shoppingCart: JSON.parse(cookies.getCookiesClientSide('shoppingCart')),
        additionalInfo: props.additionalInfo,
      },
    });
  }

  // dispatch({
  //   type: ACTIONS.GET_CART,
  //   payload: {
  //     shoppingCart: JSON.parse(cookies.getCookiesClientSide('shoppingCart')),
  //     additionalInfo: props.additionalInfo,
  //   },
  // });

  console.log('state after: ', state);

  useEffect(() => {
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
          {shoppingCartContext.state.map((productInShoppingCart, index) => {
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
                  <UpdateCart
                    product={productInShoppingCart}
                    setTotalQuantity={setTotalQuantity}
                  />
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
