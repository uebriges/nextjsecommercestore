/** @jsxImportSource @emotion/react */
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { productPageStyles } from '../styles/styles';

export default function Home(props) {
  props.products.splice(-2);
  return (
    <Layout>
      <Head>
        <title>Vino</title>
      </Head>
      <div css={productPageStyles}>
        {props.products.map((element, index) => {
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
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const database = require('../utils/database');
  const getAllProducts = database.getAllProducts;
  const products = await getAllProducts();

  return {
    props: {
      products: products || null,
    }, // will be passed to the page component as props
  };
}
