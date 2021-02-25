/** @jsxImportSource @emotion/react */
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { UserContext } from '../components/UserContext';
import { productPageStyles } from '../styles/styles';

export default function Home(props) {
  const { userState } = useContext(UserContext);
  const [products, setProducts] = useState(props.products);

  async function deleteProduct(event) {
    console.log('key: ', event.target.id);
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
      console.log('result: ', result);

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
    <Layout>
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
              <button id={element.productId} onClick={deleteProduct}>
                Delete product
              </button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const database = require('../utils/database');
  const getAllProducts = await database.getAllProducts;
  const products = await getAllProducts();

  return {
    props: {
      products: products || null,
    }, // will be passed to the page component as props
  };
}
