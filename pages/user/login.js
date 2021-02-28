import Tokens from 'csrf';
import Link from 'next/link';
import router from 'next/router';
import { useContext, useState } from 'react';
import Layout from '../../components/Layout';
import cookies from '../../utils/cookies';
import { ACTIONS, UserContext } from '../../utils/UserContext';

export default function Login(props) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { userState, dispatchUserState } = useContext(UserContext);
  async function login(event) {
    event.preventDefault();
    if (username === '' || password === '') {
      setError('User name or password missing.');
    }

    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: props.token,
        username,
        password,
      }),
    });

    const result = await response.json();

    if (response.status === 401) {
      setError('Username or password incorrect');
    } else if (response.status === 500) {
      setError('Internal server problem.');
    } else {
      cookies.setCookiesClientSide('token', result.token);
      dispatchUserState({
        type: ACTIONS.LOGIN,
        payload: {
          username,
          isAdmin:
            result.isAdmin === null || result.isAdmin === false ? false : true,
          userId: result.customerId,
        },
      });
      router.push('/');
    }
  }
  return (
    <Layout loggedInUser={props.loggedInUser}>
      <div>
        <div>
          <form onSubmit={login}>
            <input
              placeholder="User name..."
              onChange={(event) => setUserName(event.target.value)}
              value={username}
            />
            <br />
            <input
              placeholder="Password..."
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <button>Login</button>
          </form>
          <Link href="/user/register">
            <a>Register</a>
          </Link>
          <p>{error}</p>
        </div>
      </div>
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

  const tokens = new Tokens();
  const secret = process.env.CSRF_TOKEN_SECRET;

  if (typeof secret === 'undefined') {
    throw new Error('Secrete is not defined');
  }

  const token = tokens.create(secret);

  return { props: { token, loggedInUser: loggedInUser || null } };
}
