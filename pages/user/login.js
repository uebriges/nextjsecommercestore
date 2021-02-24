import Tokens from 'csrf';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';

export default function Login(props) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function login(event) {
    event.preventDefault();
    if (username === '' || password === '') {
      setError('User name or password missing.');
      console.log('username or password wrong');
    }

    const request = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: props.token,
        username,
        password,
      }),
    });
    console.log('client 1');

    const result = await request;
    console.log('result: ', result);
    console.log('client 2');

    if (result.status === 401) {
      setError('Username or password incorrect');
    } else if (result.status === 500) {
      setError('Internal server problem.');
    } else {
      router.push('/');
    }
  }
  return (
    <Layout>
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

export function getServerSideProps(context) {
  const tokens = new Tokens();
  const secret = process.env.CSRF_TOKEN_SECRET;

  if (typeof secret === 'undefined') {
    throw new Error('Secrete is not defined');
  }

  const token = tokens.create(secret);

  return { props: { token } };
}
