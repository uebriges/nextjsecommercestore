import Router from 'next/router';
import { useContext } from 'react';
import Layout from '../../components/Layout';
import { ACTIONS, UserContext } from '../../components/UserContext';
import cookies from '../../utils/cookies';

export default function Profile() {
  const { dispatchUserState } = useContext(UserContext);

  function logout() {
    dispatchUserState({ type: ACTIONS.LOGOUT });
    cookies.setCookiesClientSide('token', '');
    Router.push('/');
  }

  return (
    <Layout>
      <div>Profile</div>
      <button onClick={logout}>Logout</button>
    </Layout>
  );
}
