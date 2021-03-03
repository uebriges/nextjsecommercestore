import { css } from '@emotion/react';

export const globalStyles = css`
  html,
  body {
    margin: 0;
  }
`;

// General styles

// Stlyes for increase/decrease buttons
export const increaseDecreaseButtonStyles = css`
  border-radius: 50%;
  outline: none;
  margin: 0 5px;
`;

export const appAreaStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

export const navBarStyles = css`
  display: flex;
  background-color: rgba(237, 224, 223, 0.3);
  border-bottom: 3px ridge;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

export const menuStyles = css`
  display: inline-flex;
  gap: 20px;

  // Shopping cart quantity
  span {
    position: relative;
    right: 38px;
    bottom: 30px;
    font-size: 14px;
    font-weight: 700;
    border-radius: 50%;
    height: 10px;
    width: 25px;
    display: inline-block;
    text-align: center;
    color: black;
    pointer-events: none;
  }

  .userProfileLink {
    display: flex;
    flex-direction: column;
    align-items: center;

    .userProfileImage {
      display: inline-block;
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
      margin: 0;
      max-width: 60px;
    }

    .userProfileName {
      word-break: break-word;
      max-width: 80px;
      text-align: center;
    }
  }
`;

export const searchBarStyles = css`
  * {
    font-size: 30px;
  }
`;

export const mainStyles = css`
  align-items: stretch;
  background-color: rgba(237, 224, 223, 0.3);
  flex: auto;
  height: 80vh;
  overflow-y: auto;
  padding: 15px;
  box-sizing: border-box;
`;

export const productsPageStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  div {
    margin: 15px;
  }

  .singleProductImages {
    display: flex;
    flex-direction: column;
    max-width: 80px;
    margin: 10px;
    max-width: 200px;
    align-items: center;
    justify-content: space-between;
    text-align: center;

    .addImagesButton {
      border: none;
      background: none;
      height: 40px;
      width: 40px;
    }
  }

  .singleProductDescription {
    max-width: 500px;
  }

  .singleProductAddToCart {
    display: flex;
    flex-direction: column;
  }
`;

export const singleProductPageStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .singleProductImages {
    display: flex;
    flex-direction: column;
    max-width: 80px;
    margin: 10px;
    max-width: 200px;
    align-items: center;
    justify-content: space-between;
    text-align: center;

    .addImagesButton {
      border: none;
      background: none;
      height: 40px;
      width: 40px;
    }

    .pricePerUnit {
    }
  }

  .singleProductDescription {
    max-width: 500px;
  }

  .singleProductAddToCart {
    display: flex;
    flex-direction: column;
  }
`;

export const shoppingCartStyles = css`
  margin: 20px;
  .deleteCartItemStyles {
    pointer-events: none;
  }

  // If shopping cart is empty
  p {
    text-align: center;
    margin: auto;
  }

  .checkButton {
    text-align: center;
    font-size: 30px;
    margin-bottom: 50px;
  }

  .shoppingCartProduct {
    display: flex;
    justify-content: space-between;
    margin: 20px 0px;
    border-top: 1px solid;
    padding-top: 15px;
  }

  .quantitySumAndDelete {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;

    div {
      margin: 15px 0;
    }
  }
`;

export const checkoutStyles = css`
  height: 100%;
  display: flex;
  justify-content: space-around;

  div {
    margin: 0;
  }

  .checkoutInformation {
    display: flex;
    flex-direction: column;

    .checkoutDeliveryAndBilling {
      display: flex;
      justify-content: space-between;
      display: flex;
      flex-direction: column;
      max-width: 500px;
    }

    .checkoutDeliveryAndBilling > div {
      margin: 30px 20px;
      flex-grow: 1;

      form > input {
        margin: 10px 10px;
      }
    }
  }

  .checkoutOverviewAndBuyNow {
    display: flex;
    flex-direction: column;
    min-width: 300px;
  }
`;

export const loginPageStyles = css`
  text-align: center;

  input {
    margin-bottom: 5px;
  }
`;

export const registerPageStyles = css`
  text-align: center;

  input {
    margin-bottom: 5px;
  }
`;

export const error404Styles = css`
  background-color: rgba(237, 224, 223, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  font-size: 30px;
`;
