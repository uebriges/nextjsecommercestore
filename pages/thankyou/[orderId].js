import Router from 'next/router';
import Layout from '../../components/Layout';
export default function Thankyou(props) {
  function goToShop() {
    Router.push('/');
  }

  return (
    <Layout loggedInUser={props.loggedInUser}>
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

export async function getServerSideProps(context) {
  const database = require('../../utils/database');

  const nextCookies = require('next-cookies');
  const token = nextCookies(context).token;
  let loggedInUser;

  if (token) {
    loggedInUser = (await database.getUserByToken(token))[0];
  } else {
    loggedInUser = null;
  }
  return {
    props: { orderId: context.params.orderId, loggedInUser: loggedInUser },
  };
}
