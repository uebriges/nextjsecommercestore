/** @jsxImportSource @emotion/react */
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import {
  appAreaStyles,
  mainStyles,
  menuStyles,
  navBarStyles,
  searchBarStyles,
} from '../styles/styles';
import cookies from '../utils/cookies';
import { UserContext } from '../utils/UserContext';

export default function Layout(props) {
  const { userState } = useContext(UserContext);

  // console.log('userState bla: ', userState);

  // dispatchUserState({
  //   type: ACTIONS.GET_USER_BY_TOKEN,
  //   payload: {
  //     token: cookies.getCookiesClientSide('token'),
  //   },
  // });

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

              {!userState.isAdmin ? (
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
                  <span>{cookies.updateCartTotalQuantity()}</span>
                </div>
              ) : (
                <div></div>
              )}
              <div className="userProfileLink">
                <Link
                  href={props.loggedInUser ? '/user/profile' : '/user/login'}
                >
                  <a>
                    <Image
                      className="userProfileImage"
                      src="/user.png"
                      height={60}
                      width={60}
                      alt="User profile"
                    />
                    {props.loggedInUser ? (
                      <div className="userProfileName">
                        {props.loggedInUser ? props.loggedInUser.userName : ''}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </a>
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <main css={mainStyles}>{props.children}</main>
      </div>
    </>
  );
}
