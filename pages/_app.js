import { Global } from '@emotion/react';
import { ShoppingCartContextProvider } from '../components/ShoppingCartContext';
import { UserContextProvider } from '../components/UserContext';
import { globalStyles } from '../styles/styles';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global styles={globalStyles} />
      <UserContextProvider>
        <ShoppingCartContextProvider>
          <Component {...pageProps} />
        </ShoppingCartContextProvider>
      </UserContextProvider>
    </>
  );
}

export default MyApp;
