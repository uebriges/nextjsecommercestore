import Layout from '../../components/Layout';

export default function Login() {
  return (
    <Layout>
      <div>
        Login
        <div>
          <div>
            <input placeholder="User name..." />
            <input placeholder="Password..." type="password" />
            <button>Login</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
