/** @jsxImportSource @emotion/react */
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { productPageStyles } from '../styles/styles';
import { UserContext } from '../utils/UserContext';

export default function Home(props) {
  const { userState, dispatchUserState } = useContext(UserContext);
  const [products, setProducts] = useState(props.products);

  async function deleteProduct(event) {
    if (window.confirm('Delete product?')) {
      const response = await fetch('/api/deleteProduct', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: event.target.id,
        }),
      });
      const result = await response.json();

      if (result.deletedProductId) {
        setProducts(
          products.filter(
            (currentProduct) =>
              !(currentProduct.productId === Number(result.deletedProductId)),
          ),
        );
      }
    }
  }

  return (
    <Layout loggedInUser={props.loggedInUser}>
      <Head>
        <title>Vino</title>
      </Head>
      <div css={productPageStyles}>
        {products.map((element, index) => {
          return (
            <div key={'singleProduct' + index}>
              <Link
                key={'wineImageLink' + index}
                href="/singleProduct/[id]"
                as={'/singleProduct/' + element.productId}
              >
                <a>
                  <Image
                    key={index}
                    alt="Bottle of vine"
                    src={
                      element.imagesPerProduct
                        ? element.imagesPerProduct.split(';')[0]
                        : ''
                    }
                    width="50"
                    height="244"
                  />
                </a>
              </Link>
              <div key={'productName' + index}>{element.productName}</div>
              <div key={'productPricePerUnit' + index}>
                {element.pricePerUnit}
              </div>
              {props.loggedInUser && props.loggedInUser.isAdmin ? (
                <button id={element.productId} onClick={deleteProduct}>
                  Delete product
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const database = require('../utils/database');
  const nextCookies = require('next-cookies');
  let token = nextCookies(context).token;
  let loggedInUser;

  if (token) {
    loggedInUser = (await database.getUserByToken(token))[0];
  } else {
    loggedInUser = null;
  }

  const getAllProducts = await database.getAllProducts;
  const products = await getAllProducts();

  return {
    props: {
      products: products || null,
      loggedInUser: loggedInUser || null,
    }, // will be passed to the page component as props
  };
}
