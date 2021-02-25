import database from '../../utils/database';

export default async function deleteProduct(req, res) {
  const requestBody = req.body;
  console.log('req body: ', requestBody);

  const deletedProduct = await database.deleteProduct(requestBody.productId);

  return deletedProduct
    ? res.status(200).send({ deletedProductId: deletedProduct[0].productId })
    : res.status(500).send();
}
