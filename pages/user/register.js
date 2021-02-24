import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';

export default function Register(props) {
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  async function register(event) {
    event.preventDefault();
    console.log('event: ', event);
    console.log('username: ', username === '');

    if (password !== repeatedPassword || password === '') {
      setErrorMessage('Passwords missing or do not match.');
      return;
    } else if (username === '') {
      setErrorMessage('User name missing');
      return;
    } else if (email === '') {
      setErrorMessage('Email is missing');
      return;
    }

    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        token: props.token,
      }),
    });

    const { success } = await response.json();
    if (success) {
      router.push('/user/login');
    } else {
      if (response.status === '409') {
        setErrorMessage('User already exists');
      } else {
        setErrorMessage('Failed');
      }
    }
  }

  return (
    <Layout>
      <div>
        Login
        <div>
          <div>
            <form onSubmit={register}>
              <input
                placeholder="User name..."
                value={username}
                onChange={(event) => setUserName(event.target.value)}
              />
              <br />
              <input
                placeholder="Email..."
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <br />
              <input
                placeholder="Password..."
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <br />
              <input
                placeholder="Repeat password..."
                type="password"
                value={repeatedPassword}
                onChange={(event) => setRepeatedPassword(event.target.value)}
              />
              <button>Register</button>
              <p>{errorMessage}</p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const tokens = new (await import('csrf')).default();
  const secret = process.env.CSRF_TOKEN_SECRET;

  if (typeof secret === 'undefined') {
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured!');
  }

  const token = tokens.create(secret);

  return { props: { token: token } };
}
