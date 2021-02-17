import Image from 'next/image';
import Layout from '../../components/Layout';
import { shoppingCartStyles } from '../../styles/styles';
import cookies from '../../utils/cookies';

export default function ShoppingCart() {
  const shoppingCart = cookies.getCookiesClientSide('shoppingCart');
  console.log('Shopping cart: ', shoppingCart);
  console.log('Shopping cart: ', JSON.parse(shoppingCart));
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
          {JSON.parse(shoppingCart).map((productInShoppingCart, index) => {
            return (
              <div key={index}>
                <div className="cartProductImage">
                  <Image
                    src="/"
                    alt="Product image in cart"
                    height="120"
                    width="120"
                  />
                </div>
                {/* <div key={productInShoppingCart.productName + index}>
                  {productInShoppingCart.productName}
                </div> */}
                <div key={productInShoppingCart.quantity + index}>
                  {productInShoppingCart.quantity}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
