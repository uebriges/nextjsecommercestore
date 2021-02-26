import { Global } from '@emotion/react';
import { globalStyles } from '../styles/styles';
import { ShoppingCartContextProvider } from '../utils/ShoppingCartContext';
import { UserContextProvider } from '../utils/UserContext';

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
