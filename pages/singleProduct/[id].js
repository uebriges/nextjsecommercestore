/** @jsxImportSource @emotion/react */
import Image from 'next/image';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import { productPageStyles } from '../../styles/styles';
import Error404 from '../404';
import AddToCart from './AddToCart';

export default function SingleProduct(props) {
  useEffect(() => {}, []);

  if (!props.product) {
    return <Error404 />;
  }

  console.log(props.product);
  const images = props.product.imagesPerProduct.split(';');

  return (
    <Layout>
      <div css={productPageStyles}>
        {/* For later: If admin is logged in, button for adding images is shown */}
        <div className="singleProductImages">
          {true ? (
            <div></div>
          ) : (
            <div>
              <button value="Add images" className="addImagesButton">
                <Image
                  src="/addButton.png"
                  height="60"
                  width="60"
                  alt="Add image"
                />
              </button>
            </div>
          )}

          {images.map((picture, index) => {
            return (
              <Image
                key={index}
                alt="Bottle of vine"
                src={picture}
                width="140"
                height="488"
              />
            );
          })}
        </div>
        <div className="singleProductDescription">
          {props.product.productDescription}
        </div>
        <div className="singleProductAddToCart">
          <div>Price: {props.product.pricePerUnit}</div>
          {/* For later: If admin is logged in, AddToCart is not shown  */}
          {true ? <AddToCart product={props.product} /> : <div></div>}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const database = require('../../utils/database');
  const getAllProducts = database.getAllProducts;
  const products = await getAllProducts();
  console.log('Query: ', context.query.id);
  console.log(products);
  const product = products.find((element) => {
    return element.productId.toString() === context.query.id;
  });

  if (!product) {
    context.res.statusCode = 404;
  }

  console.log('Cookies: ', context.req.cookies);
  return {
    props: { product: product || null }, // will be passed to the page component as props
  };
}
