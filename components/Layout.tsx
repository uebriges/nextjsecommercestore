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
import * as cookies from '../utils/cookies';
import { UserContext } from '../utils/UserContext';

export interface LoggedInUserType {
  id: string;
  isAdmin: boolean;
  userName: string;
  timestamp: string;
}

interface LayoutProps {
  loggedInUser?: LoggedInUserType;
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { userState } = useContext(UserContext);

  console.log('props.loggedInUser: ', props.loggedInUser !== null);

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
                  <span data-cy="TotalQuantityInShoppingCart">
                    {cookies.updateCartTotalQuantity()}
                  </span>
                </div>
              ) : null}
              <div className="userProfileLink">
                <Link
                  href={
                    props.loggedInUser !== null
                      ? '/user/profile'
                      : '/user/login'
                  }
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
                        {props.loggedInUser
                          ? props.loggedInUser.userName
                          : null}
                      </div>
                    ) : null}
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
