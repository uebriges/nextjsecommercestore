/** @jsxImportSource @emotion/react */
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { UserContext } from '../../components/UserContext';
import { productPageStyles } from '../../styles/styles';
import cookies from '../../utils/cookies';
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
    <Layout>
      <div css={productPageStyles}>
        {/* For later: If admin is logged in, button for adding images is shown */}
        <div className="singleProductImages">
          {!userState.isAdmin ? (
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
          {userState.isAdmin ? (
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
            {userState.isAdmin ? (
              <input
                defaultValue={props.product.pricePerUnit}
                onChange={(event) => setPricePerUnit(event.target.value)}
              />
            ) : (
              props.product.pricePerUnit
            )}
          </div>
          {/* For later: If admin is logged in, AddToCart is not shown  */}
          {!userState.isAdmin ? (
            <AddToCart
              product={props.product}
              setTotalQuantity={setTotalQuantity}
            />
          ) : (
            <>
              <button onClick={saveChanges}>Update product</button>
              <p>{updateProductMessage}</p>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const database = require('../../utils/database');
  const getAllProducts = database.getAllProducts;
  const products = await getAllProducts();
  const product = products.find((element) => {
    return element.productId.toString() === context.query.id;
  });

  if (!product) {
    context.res.statusCode = 404;
  }

  //console.log('Cookies: ', context.req.cookies);
  return {
    props: { product: product || null }, // will be passed to the page component as props
  };
}
