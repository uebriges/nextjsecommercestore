import Router from 'next/router';
import { useContext } from 'react';
import Layout from '../../components/Layout';
import { ACTIONS, UserContext } from '../../components/UserContext';
import cookies from '../../utils/cookies';

export default function Profile() {
  const { userState, dispatchUserState } = useContext(UserContext);

  function logout() {
    dispatchUserState({ type: ACTIONS.LOGOUT });
    cookies.setCookiesClientSide('token', '');
    Router.push('/user/login');
  }
  console.log('userstate: ', userState);

  return (
    <Layout>
      <div>Profile of </div>
      <button onClick={logout}>Logout</button>
    </Layout>
  );
}
