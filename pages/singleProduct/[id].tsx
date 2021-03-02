/** @jsxImportSource @emotion/react */
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout, { LoggedInUserType } from '../../components/Layout';
import { productPageStyles } from '../../styles/styles';
import * as cookies from '../../utils/cookies';
import Error404 from '../404';
import AddToCart from './AddToCart';

type ProductType = {
  productId: number;
  productName: string;
  productionYear: number;
  pricePerUnit: number;
  productDescription: string;
  producer: string;
  inventory: string;
  imagesPerProduct: string;
};

type SingleProductType = {
  product: ProductType;
  loggedInUser: LoggedInUserType;
};

export default function SingleProduct(props: SingleProductType) {
  const [totalQuantity, setTotalQuantity] = useState();
  const [productDescription, setProductDescription] = useState(
    props.product.productDescription,
  );
  const [pricePerUnit, setPricePerUnit] = useState(props.product.pricePerUnit);
  const [updateProductMessage, setUpdateProductMessage] = useState('');

  async function saveChanges() {
    const response = await fetch('/api/updateProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: props.product.productId,
        productDescription,
        pricePerUnit,
      }),
    });
    // await response.json();
    response.status === 200
      ? setUpdateProductMessage('Product updated')
      : setUpdateProductMessage(
          'Something went wrong. Please try it again later.',
        );
  }

  useEffect(() => {
    setTotalQuantity(cookies.updateCartTotalQuantity());
  }, []);

  if (!props.hasOwnProperty('product')) {
    return <Error404 />;
  }

  const images = props.product.imagesPerProduct.split(';');

  return (
    <Layout loggedInUser={props.loggedInUser}>
      <div css={productPageStyles}>
        {/* For later: If admin is logged in, button for adding images is shown */}
        <div className="singleProductImages">
          {props.loggedInUser && props.loggedInUser.isAdmin ? (
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
          ) : null}

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
          {props.loggedInUser !== null && props.loggedInUser.isAdmin ? (
            <textarea
              defaultValue={props.product.productDescription}
              onChange={(event) => setProductDescription(event.target.value)}
              style={{ height: '300px' }}
              rows={30}
              cols={50}
            />
          ) : (
            props.product.productDescription
          )}
        </div>
        <div className="singleProductAddToCart">
          <div>
            Price:
            {props.loggedInUser && props.loggedInUser.isAdmin ? (
              <input
                defaultValue={props.product.pricePerUnit}
                onChange={(event) =>
                  setPricePerUnit(
                    Number((event.target as HTMLInputElement).value),
                  )
                }
              />
            ) : (
              props.product.pricePerUnit
            )}
          </div>
          {props.loggedInUser && props.loggedInUser.isAdmin ? (
            <>
              <button onClick={saveChanges}>Update product</button>
              <p>{updateProductMessage}</p>
            </>
          ) : (
            <AddToCart
              product={props.product}
              setTotalQuantity={setTotalQuantity}
              totalQantity={totalQuantity}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const database = require('../../utils/database');
  const nextCookies = require('next-cookies');
  const token = nextCookies(context).token;
  let loggedInUser;

  if (token) {
    loggedInUser = (await database.getUserByToken(token))[0];
  } else {
    loggedInUser = null;
  }

  const getAllProducts = database.getAllProducts;
  const products = await getAllProducts();
  const product = products.find((element: ProductType) => {
    return element.productId.toString() === context.query.id;
  });

  if (!product) {
    if (context.res) {
      context.res.statusCode = 404;
    }
  }

  return {
    props: { product: product || null, loggedInUser: loggedInUser || null }, // will be passed to the page component as props
  };
}
