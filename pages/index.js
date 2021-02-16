/** @jsxImportSource @emotion/react */
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { mainStyles, productPageStyles } from '../styles/styles';

export default function Home(props) {
  const router = useRouter();
  props.products.splice(-2);
  console.log('Products: ', props.products);
  return (
    <Layout>
      <Head>
        <title>Vino</title>
      </Head>
      <main css={mainStyles}>
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
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const database = require('../util/database');
  const getAllProducts = database.getAllProducts;
  const products = await getAllProducts();
  return {
    props: { products }, // will be passed to the page component as props
  };
}
