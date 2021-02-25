import database from '../../utils/database';

export default async function updateProduct(req, res) {
  const respBody = {};
  console.log(req.body);
  const { productId, productDescription, pricePerUnit } = req.body;
  console.log('pricePerUnit db: ', pricePerUnit);
  const updatedProduct = await database.updateProduct(
    productId,
    productDescription,
    pricePerUnit,
  );
  console.log('updated product: ', updatedProduct);

  return updatedProduct[0].productId
    ? res.status(200).send({})
    : res.status(500).send({});
}
