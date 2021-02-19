import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { shoppingCartStyles } from '../../styles/styles';
import cookies from '../../utils/cookies';
import UpdateCart from './UpdateCart';

export default function ShoppingCart(props) {
  const [totalQuantity, setTotalQuantity] = useState();
  const shoppingCart = props.shoppingCart;
  const completeShoppingCartEntryInfos = [];

  // Merge array from cookies (productIds + quantity) with the array from data
  // from the database (imageData, pricePerUnit etc.)
  if (shoppingCart) {
    for (let i = 0; i < shoppingCart.length; i++) {
      completeShoppingCartEntryInfos.push({
        ...shoppingCart[i],
        ...props.additionalInfo.find(
          (itmInner) => itmInner.productId === shoppingCart[i].productId,
        ),
      });
    }
  }

  useEffect(() => {
    setTotalQuantity(cookies.updateCartTotalQuantity());
  }, []);

  // const [shoppingCart, setShoppingCart] = useState(
  //   JSON.parse(cookies.getCookiesClientSide('shoppingCart')),
  // );

  return (
    <Layout>
      <div css={shoppingCartStyles}>
        <div>
          <button>Go to checkout</button>
        </div>
        <div>
          {completeShoppingCartEntryInfos.map(
            (productInShoppingCart, index) => {
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
            },
          )}
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
