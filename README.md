Create a readme with:

- title
- description
- all technologies used
- 1 or 2 screenshots
- setup instructions
- deployment instructions
  <br/><br/>

# Next.js E-Commmerce store

This is a [Next.js](https://nextjs.org/) vine e-commerce store project.

## Features

- Show all products in shop
- Single product page
  - Show details of single product
  - Increase/Decrease quantity of single product and add it to the cart
- Shopping cart
  - Increase/Decrease quantity for products in the shopping cart
  - Click on product to go back to the products page
  - Delete product from cart
- Checkout
  - Enter delivery and billing address
  - Decide if billing address is different from billing address
  - Chose delivery option (premium/standard)
  - Buy now button leads to thank you page
- User accounts
  - Login as admin or standard user
  - Admin can change products description and price and can delete products from cart
  - Standard users can buy products. Order is stored in the database

IMPORTANT: Cookies need to be activated
<br/><br/>

## Technologies use

- Next.js
- Ley (for database migration)
- Cypress and Jest for testing
- Cookies management (cookies-js)
- Password management (argon2, crypto, CSFR)

## Getting Started

<br/>
First, make sure you have a postgres database up and running and run the migration via

```bash
yarn migrate up
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- Data base structure

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
