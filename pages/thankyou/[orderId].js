import Router from 'next/router';
import Layout from '../../components/Layout';
export default function Thankyou(props) {
  function goToShop() {
    Router.push('/');
  }

  return (
    <Layout>
      <div>
        <p>Thank you for your order.</p>{' '}
        <p>Your order number is: {props.orderId}</p>
        <p>We sent you an email with all your booking information.</p>
        <div>
          <button onClick={goToShop}>Back to shop</button>
          <button>Your orders</button>
        </div>
      </div>
    </Layout>
  );
}

export function getServerSideProps(context) {
  console.log('id: ', context.params);
  return { props: { orderId: context.params.orderId } };
}
