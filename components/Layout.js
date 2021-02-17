/** @jsxImportSource @emotion/react */
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  appAreaStyles,
  mainStyles,
  menuStyles,
  navBarStyles,
  searchBarStyles,
} from '../styles/styles';
import cookies from '../utils/cookies';

export default function Layout(props) {
  const [totalQuantity, setTotalQuantity] = useState();

  useEffect(() => {
    setTotalQuantity(cookies.updateCartTotalQuantity());
  }, [totalQuantity]);

  console.log('props.children: ', props.children);

  return (
    <>
      <Head>
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
              {/* For later: If administrator is logged in, no shopping cart */}

              {true ? (
                <div>
                  <Link href="/shoppingCart">
                    <a>
                      <Image
                        src="/shoppingCart.svg"
                        height={60}
                        width={60}
                        alt="Shopping Cart"
                      />
                    </a>
                  </Link>
                  <span>{totalQuantity}</span>
                </div>
              ) : (
                <div></div>
              )}
              <div className="userProfileLink">
                <Link href="/">
                  <a>
                    <Image
                      className="userProfileImage"
                      src="/user.png"
                      height={60}
                      width={60}
                      alt="User profile"
                    />
                    {/* For later: If website visitor is logged in, user name is displayed */}
                    {true ? (
                      <div className="userProfileName" />
                    ) : (
                      <div className="userProfileName">User name</div>
                    )}
                  </a>
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <main css={mainStyles}>
          {
            props.children
            // React.cloneElement(props.children, {
            //   totalQuantity: totalQuantity,
            //   setTotalQuantity: setTotalQuantity,
            // })
          }
        </main>
      </div>
    </>
  );
}
