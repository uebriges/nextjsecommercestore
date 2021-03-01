import { NextApiRequest, NextApiResponse } from 'next';
import * as database from '../../utils/database';

export default async function deleteProduct(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const requestBody = req.body;

  const deletedProduct = await database.deleteProduct(requestBody.productId);

  return deletedProduct
    ? res.status(200).send({ deletedProductId: deletedProduct[0].productId })
    : res.status(500).send({});
}
