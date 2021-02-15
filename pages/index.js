/** @jsxImportSource @emotion/react */
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  appAreaStyles,
  mainStyles,
  menuStyles,
  navBarStyles,
  searchBarStyles,
} from './styles';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="appArea" css={appAreaStyles}>
        <header>
          <nav css={navBarStyles}>
            <div className="logo">
              <Link href="/">
                <a>
                  <Image
                    src="/wineBottles.svg"
                    height={60}
                    width={60}
                    alt="Home button"
                  />
                </a>
              </Link>
            </div>
            <div className="searchBar" css={searchBarStyles}>
              <input placeholder="Search..." />
              <button>Search</button>
            </div>
            <div className="menu" css={menuStyles}>
              <Link href="/">
                <a>
                  <Image
                    src="/shoppingCart.svg"
                    height={60}
                    width={60}
                    alt="Shopping Cart"
                  />
                </a>
              </Link>
              <Link href="/">
                <a>
                  <Image
                    src="/user.png"
                    height={60}
                    width={60}
                    alt="Shopping Cart"
                  />
                </a>
              </Link>
            </div>
          </nav>
        </header>
        <main css={mainStyles}>
          <div>asdlfjasdf</div>
        </main>
      </div>
    </>
  );
}
