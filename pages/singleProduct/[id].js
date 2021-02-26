/** @jsxImportSource @emotion/react */
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { productPageStyles } from '../../styles/styles';
import cookies from '../../utils/cookies';
import { UserContext } from '../../utils/UserContext';
import Error404 from '../404';
import AddToCart from './AddToCart';

export default function SingleProduct(props) {
  const [totalQuantity, setTotalQuantity] = useState();
  const { userState } = useContext(UserContext);
  const [productDescription, setProductDescription] = useState(
    props.product.productDescription,
  );
  const [pricePerUnit, setPricePerUnit] = useState(props.product.pricePerUnit);
  const [updateProductMessage, setUpdateProductMessage] = useState('');

  console.log('props logged in user single prod: ', props.loggedInUser);

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
    const result = await response.json();
    response.status === 200
      ? setUpdateProductMessage('Product updated')
      : setUpdateProductMessage(
          'Something went wrong. Please try it again later.',
        );
  }

  useEffect(() => {
    setTotalQuantity(cookies.updateCartTotalQuantity());
  }, []);

  if (!props.product) {
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
          ) : (
            <div></div>
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
          {props.loggedInUser && props.loggedInUser.isAdmin ? (
            <textarea
              defaultValue={props.product.productDescription}
              onChange={(event) => setProductDescription(event.target.value)}
              stlye={{ height: '300px' }}
              rows="30"
              cols="50"
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
                onChange={(event) => setPricePerUnit(event.target.value)}
              />
            ) : (
              props.product.pricePerUnit
            )}
          </div>
          {/* For later: If admin is logged in, AddToCart is not shown  */}
          {props.loggedInUser && props.loggedInUser.isAdmin ? (
            <>
              <button onClick={saveChanges}>Update product</button>
              <p>{updateProductMessage}</p>
            </>
          ) : (
            <AddToCart
              product={props.product}
              setTotalQuantity={setTotalQuantity}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const database = require('../../utils/database');
  const nextCookies = require('next-cookies');
  let token = nextCookies(context).token;
  let loggedInUser;

  console.log('single product: token', token);
  if (token) {
    loggedInUser = (await database.getUserByToken(token))[0];
  } else {
    loggedInUser = null;
  }

  console.log('single product: loggedInUser', loggedInUser);
  console.log('single product: ');
  console.log('single product: ');

  const getAllProducts = database.getAllProducts;
  const products = await getAllProducts();
  const product = products.find((element) => {
    return element.productId.toString() === context.query.id;
  });

  if (!product) {
    context.res.statusCode = 404;
  }

  return {
    props: { product: product || null, loggedInUser: loggedInUser || null }, // will be passed to the page component as props
  };
}
