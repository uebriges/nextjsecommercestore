import { Global } from '@emotion/react';
import { ShoppingCartContextProvider } from '../components/ShoppingCartContext';
import { globalStyles } from '../styles/styles';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global styles={globalStyles} />
      <ShoppingCartContextProvider>
        <Component {...pageProps} />
      </ShoppingCartContextProvider>
    </>
  );
}

export default MyApp;
