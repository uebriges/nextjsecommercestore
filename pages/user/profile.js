import Router from 'next/router';
import { useContext, useState } from 'react';
import Layout from '../../components/Layout';
import cookies from '../../utils/cookies';
import { ACTIONS, UserContext } from '../../utils/UserContext';

export default function Profile(props) {
  const { userState, dispatchUserState } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');

  async function logout() {
    console.log('props.token: ', props.token);
    const response = await fetch('/api/deleteSession', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: props.token }),
    });
    const deletedSession = await response.json();
    console.log('deletedSession: ', deletedSession);

    deletedSession
      ? Router.push('/user/login')
      : setErrorMessage('Logout failed.');

    cookies.setCookiesClientSide('token', '');
    dispatchUserState({ type: ACTIONS.LOGOUT });
  }

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
  console.log('cookiesToken: ', cookieToken);

  let loggedInUser;

  if (cookieToken) {
    loggedInUser = (await database.getUserByToken(cookieToken))[0];
  } else {
    loggedInUser = null;
  }

  return {
    props: { loggedInUser: loggedInUser || null, token: cookieToken || null },
  };
}
