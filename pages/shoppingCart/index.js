import Layout from '../../components/Layout';
import cookies from '../../utils/cookies';

export default function ShoppingCart() {
  const shoppingCart = cookies.getCookiesClientSide('shoppingCart');
  console.log(shoppingCart);

  return (
    <Layout>
      <div>
        {/* {shoppingCart.map((element) => {
          console.log(element);
          <div>{element.productId}</div>;
          <div>{element.quantity}</div>;
        })} */}
      </div>
    </Layout>
  );
}
