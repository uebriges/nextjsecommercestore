import Router from 'next/router';
import { useContext } from 'react';
import Layout from '../../components/Layout';
import cookies from '../../utils/cookies';
import { ACTIONS, UserContext } from '../../utils/UserContext';

export default function Profile(props) {
  const { userState, dispatchUserState } = useContext(UserContext);

  async function logout() {
    dispatchUserState({ type: ACTIONS.LOGOUT });
    cookies.setCookiesClientSide('token', '');
    Router.push('/user/login');
  }
  console.log('userstate userprofile: ', userState);

  if (!props.loggedInUser) {
    Router.push('/');
  }

  return (
    <Layout loggedInUser={props.loggedInUser}>
      {props.loggedInUser ? (
        <>
          <div>Profile of </div>
          <button onClick={logout}>Logout</button>
        </>
      ) : null}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const database = require('../../utils/database');
  const nextCookies = require('next-cookies');

  const cookieToken = nextCookies(context).token;
  let loggedInUser;

  if (cookieToken) {
    loggedInUser = (await database.getUserByToken(cookieToken))[0];
  } else {
    loggedInUser = null;
  }

  return { props: { loggedInUser: loggedInUser || null } };
}
