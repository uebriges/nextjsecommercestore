/** @jsxImportSource @emotion/react */
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout, { LoggedInUserType } from '../../components/Layout';
import {
  increaseDecreaseButtonStyles,
  singleProductPageStyle,
} from '../../styles/styles';
import * as cookies from '../../utils/cookies';
import Error404 from '../404';

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

type ProductInCookiesType = {
  productId: number;
  quantity: number;
};

export default function SingleProduct(props: SingleProductType) {
  // const [totalQuantity, setTotalQuantity] = useState();
  const [productDescription, setProductDescription] = useState(
    props.product.productDescription,
  );
  const [pricePerUnit, setPricePerUnit] = useState(props.product.pricePerUnit);
  const [updateProductMessage, setUpdateProductMessage] = useState('');
  const [quantityOfSingleProduct, setQuantityOfSingleProduct] = useState(0);
  const [sumOfSingleProduct, setSumOfSingleProduct] = useState(0);

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
    response.status === 200
      ? setUpdateProductMessage('Product updated')
      : setUpdateProductMessage(
          'Something went wrong. Please try it again later.',
        );
  }

  useEffect(() => {
    cookies.updateCartTotalQuantity();
  }, []);

  useEffect(() => {
    setSumOfSingleProduct(quantityOfSingleProduct * props.product.pricePerUnit);
  }, [quantityOfSingleProduct, props.product.pricePerUnit]);

  if (!props.hasOwnProperty('product')) {
    return <Error404 />;
  }

  const images = props.product.imagesPerProduct.split(';');

  // ----------------- construction area

  function changeQuantityByClickHandler(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    if (event.currentTarget.innerHTML === '+') {
      setQuantityOfSingleProduct(quantityOfSingleProduct + 1);
    } else {
      setQuantityOfSingleProduct(
        quantityOfSingleProduct > 0 ? quantityOfSingleProduct - 1 : 0,
      );
    }
  }

  function changeQuantityByInputHandler(
    event: React.FormEvent<HTMLInputElement>,
  ) {
    setQuantityOfSingleProduct(Number(event.currentTarget.value));
  }

  function addSingleProductToCart() {
    // Check if product id already available in cookies
    // If true -> get value, add quantity, write new quantity into cookie
    // if false -> write quantity into cookie
    if (cookies.getCookiesClientSide('shoppingCart')) {
      const productsInCookiesArray = JSON.parse(
        cookies.getCookiesClientSide('shoppingCart'),
      );
      const product = productsInCookiesArray.find(
        (element: ProductInCookiesType) =>
          element.productId === props.product.productId,
      );
      if (product) {
        product.quantity = product.quantity + quantityOfSingleProduct;
        productsInCookiesArray.map((element: ProductInCookiesType) =>
          element.productId === product.productId ? product : element,
        );
        cookies.setCookiesClientSide(
          'shoppingCart',
          JSON.stringify(productsInCookiesArray),
        );
        cookies.updateCartTotalQuantity();
        cookies.updateCartTotalQuantity();
      } else {
        productsInCookiesArray.push({
          productId: props.product.productId,
          quantity: quantityOfSingleProduct,
        });
        cookies.setCookiesClientSide(
          'shoppingCart',
          JSON.stringify(productsInCookiesArray),
        );
        cookies.updateCartTotalQuantity();
      }
    } else {
      const shoppingCartEntry = {
        productId: props.product.productId,
        quantity: quantityOfSingleProduct,
      };
      cookies.setCookiesClientSide('shoppingCart', [shoppingCartEntry]);
      cookies.updateCartTotalQuantity();
      cookies.updateCartTotalQuantity();
    }
    setQuantityOfSingleProduct(0);
  }

  return (
    <Layout loggedInUser={props.loggedInUser}>
      <div css={singleProductPageStyle}>
        {/* For later: If admin is logged in, button for adding images is shown */}
        <div className="singleProductImages">
          {props.loggedInUser.isAdmin ? (
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
              <div key={'singeProductImage' + index}>
                <Image
                  key={index}
                  alt="Bottle of vine"
                  src={picture}
                  width="140"
                  height="488"
                />
              </div>
            );
          })}
        </div>
        <div className="singleProductDescription">
          {props.loggedInUser.isAdmin ? (
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
            {props.loggedInUser.isAdmin ? (
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
          {props.loggedInUser.isAdmin ? (
            <>
              <button onClick={saveChanges}>Update product</button>
              <p>{updateProductMessage}</p>
            </>
          ) : (
            // Change quantity of product
            <>
              <div>
                <button
                  css={increaseDecreaseButtonStyles}
                  onClick={changeQuantityByClickHandler}
                >
                  -
                </button>
                <input
                  type="text"
                  min="0"
                  value={quantityOfSingleProduct}
                  onChange={changeQuantityByInputHandler}
                />
                <button
                  css={increaseDecreaseButtonStyles}
                  data-cy="IncreaseQuantityButton"
                  onClick={changeQuantityByClickHandler}
                >
                  +
                </button>
              </div>
              <div>Total: {sumOfSingleProduct.toFixed(2)}</div>
              <div>
                <button
                  data-cy="AddToCartButton"
                  onClick={addSingleProductToCart}
                >
                  Add to cart
                </button>
              </div>
            </>
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
    context.res.statusCode = 404;
  }

  return {
    props: { product: product || null, loggedInUser: loggedInUser || null }, // will be passed to the page component as props
  };
}
