/** @jsxImportSource @emotion/react */
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Layout, { LoggedInUserType } from '../../components/Layout';
import { checkoutStyles } from '../../styles/styles';
import { ACTIONS } from '../../utils/cartContextHelper';
import * as cookies from '../../utils/cookies';
import { shoppingCartContext } from '../../utils/ShoppingCartContext';
import { UserContext } from '../../utils/UserContext';

export type CheckoutShoppingCartPropsType = {
  additionalInfo: object;
  shoppingCart: object;
  loggedInUser: LoggedInUserType;
};

type ShoppingCartStateType = {
  pricePerUnit: string;
  quantity: string;
};

export default function Checkout(props: CheckoutShoppingCartPropsType) {
  // states and contexts
  const { dispatch, state } = useContext(shoppingCartContext);
  const [sameBillingAddress, setSameBillingAddress] = useState(true);
  const [premiumDelivery, setPremiumDelivery] = useState(true);
  const [nettoPrice] = useState(
    state.reduce((lumpSum: number, shoppingCartItem: ShoppingCartStateType) => {
      return (
        lumpSum +
        Number(shoppingCartItem.pricePerUnit) *
          Number(shoppingCartItem.quantity)
      );
    }, 0),
  );
  const [shippingCosts] = useState(() => {
    if (
      (premiumDelivery && nettoPrice * 1.2 > 150) ||
      (!premiumDelivery && nettoPrice * 1.2 > 100)
    ) {
      return 0;
    } else {
      return 10;
    }
  });
  const [shoppingCart] = useState(
    cookies.getCookiesClientSide('shoppingCart')
      ? JSON.parse(cookies.getCookiesClientSide('shoppingCart'))
      : props.shoppingCart,
  );
  const { userState } = useContext(UserContext);
  const router = useRouter();

  // Toggle billing information changeability

  function activateBillingInformation(
    event: React.MouseEvent<HTMLInputElement>,
  ) {
    (event.target as HTMLInputElement).value === 'Yes'
      ? setSameBillingAddress(true)
      : setSameBillingAddress(false);
  }

  // Toggle delivery option

  function handleDeliveryOption(event: React.ChangeEvent<HTMLInputElement>) {
    setPremiumDelivery(event.target.value === 'premium' ? true : false);
  }

  // Buy products in cart

  async function buyNow() {
    // Update shopping cart state

    dispatch({
      type: ACTIONS.ADD_ADDITIONAL_INFO_TO_CART,
      payload: {
        shoppingCart: shoppingCart,
        additionalInfo: props.additionalInfo,
      },
    });

    // Store order

    const response = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shoppingCart: state,
        deliveryOptionId: premiumDelivery === true ? 2 : 1,
        customerId: userState.userId,
      }),
    });
    const orderId = await response.json();

    dispatch({
      type: ACTIONS.EMPTY_CART,
    });

    router.push('/thankyou/' + orderId);
  }

  useEffect(() => {
    dispatch({
      type: ACTIONS.ADD_ADDITIONAL_INFO_TO_CART,
      payload: {
        shoppingCart: shoppingCart,
        additionalInfo: props.additionalInfo,
      },
    });
  });

  return (
    <Layout loggedInUser={props.loggedInUser}>
      <div css={checkoutStyles}>
        <div className="checkoutInformation">
          <h2>Please check your order and your delivery/billing information</h2>
          <div className="checkoutDeliveryAndBilling">
            <div>
              Delivery address
              <form>
                <fieldset>
                  <legend>Name</legend>
                  <input
                    data-cy="checkoutDeliveryFirstName"
                    type="text"
                    placeholder="First name"
                  />
                  <input
                    data-cy="checkoutDeliveryLastName"
                    type="text"
                    placeholder="Last name"
                  />
                </fieldset>
                <fieldset>
                  <legend>Location</legend>
                  <input
                    data-cy="checkoutDeliveryStreetAddress"
                    type="text"
                    placeholder="Street Address"
                  />
                  <input
                    data-cy="checkoutDeliveryStreetAddress2"
                    type="text"
                    placeholder="Street Address Line 2"
                  />
                  <input
                    data-cy="checkoutDeliveryCity"
                    type="text"
                    placeholder="City"
                  />
                  <input
                    data-cy="checkoutDeliveryState"
                    type="text"
                    placeholder="State / Province"
                  />
                  <input
                    data-cy="checkoutDeliveryZIP"
                    type="text"
                    placeholder="Postal / ZIP Code"
                  />
                  <input
                    data-cy="checkoutDeliveryCountry"
                    type="text"
                    placeholder="Country"
                  />
                </fieldset>
              </form>
            </div>
            <div>
              Billing address
              <fieldset>
                <legend>Same as delivery address?</legend>
                <label htmlFor="billingInfoEqualsDeliveryInfoYes">Yes</label>
                <input
                  type="radio"
                  name="billingInfoEqualsDeliveryInfo"
                  value="Yes"
                  id="billingInfoEqualsDeliveryInfoYes"
                  onClick={activateBillingInformation}
                  checked={sameBillingAddress}
                />
                <br />
                <label htmlFor="billingInfoEqualsDeliveryInfoNo">No</label>
                <input
                  type="radio"
                  name="billingInfoEqualsDeliveryInfo"
                  value="No"
                  id="billingInfoEqualsDeliveryInfoNo"
                  onClick={activateBillingInformation}
                  data-cy="billingAdrEquDeliveryNo"
                />
              </fieldset>
              <form>
                <fieldset>
                  <legend>Name</legend>
                  <input
                    type="text"
                    placeholder="First name"
                    readOnly={sameBillingAddress}
                    data-cy="checkoutBillingFirstName"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    readOnly={sameBillingAddress}
                    data-cy="checkoutBillingLastName"
                  />
                </fieldset>
                <fieldset>
                  <legend>Location</legend>
                  <input
                    type="text"
                    placeholder="Street Address"
                    readOnly={sameBillingAddress}
                    data-cy="checkoutBillingStreetAddress"
                  />
                  <input
                    type="text"
                    placeholder="Street Address Line 2"
                    readOnly={sameBillingAddress}
                    data-cy="checkoutBillingStreetAddress1"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    readOnly={sameBillingAddress}
                    data-cy="checkoutBillingCity"
                  />
                  <input
                    type="text"
                    placeholder="State / Province"
                    readOnly={sameBillingAddress}
                    data-cy="checkoutBillingState"
                  />
                  <input
                    type="text"
                    placeholder="Postal / ZIP Code"
                    readOnly={sameBillingAddress}
                    data-cy="checkoutBillingZIP"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    readOnly={sameBillingAddress}
                    data-cy="checkoutBillingCountry"
                  />
                </fieldset>
              </form>
            </div>
            <div>
              <fieldset>
                <legend>Delivery options</legend>
                <label htmlFor="billingInfoEqualsDeliveryInfoYes">
                  Premium
                </label>
                <input
                  type="radio"
                  name="delivery"
                  value="premium"
                  id="premiumDelivery"
                  onChange={handleDeliveryOption}
                  checked={premiumDelivery}
                  data-cy="premiumDeliveryRadioBtn"
                />
                <br />
                <label htmlFor="billingInfoEqualsDeliveryInfoNo">
                  Standard
                </label>
                <input
                  type="radio"
                  name="delivery"
                  value="standard"
                  id="standardDelivery"
                  onChange={handleDeliveryOption}
                />
              </fieldset>
            </div>
          </div>
        </div>
        <div className="checkoutOverviewAndBuyNow">
          <button data-cy="buyNowBtn" onClick={buyNow}>
            Buy now
          </button>
          <p>Overview</p>
          <p>Price: {nettoPrice.toFixed(2)}</p>
          <p>Shipping: {shippingCosts.toFixed(2)}</p>
          <p>VAT: {(nettoPrice * 0.2).toFixed(2)}</p>
          <p>Total: {(nettoPrice * 1.2 + shippingCosts).toFixed(2)}</p>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const database = require('../../utils/database');
  let additionalInfo;
  let shoppingCart;

  const nextCookies = require('next-cookies');
  const token = nextCookies(context).token;
  let loggedInUser;

  if (token) {
    loggedInUser = (await database.getUserByToken(token))[0];
  } else {
    loggedInUser = null;
  }

  if (context.req.cookies.shoppingCart) {
    additionalInfo = await database.getAdditionalInfoForCartItemsCookie(
      JSON.parse(context.req.cookies.shoppingCart),
    );
    shoppingCart = JSON.parse(context.req.cookies.shoppingCart);
  }

  return {
    props: {
      additionalInfo: additionalInfo || null,
      shoppingCart: shoppingCart || null,
      loggedInUser: loggedInUser || null,
    },
  };
}
