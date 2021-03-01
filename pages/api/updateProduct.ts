import { NextApiRequest, NextApiResponse } from 'next';
import * as database from '../../utils/database';

export default async function updateProduct(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { productId, productDescription, pricePerUnit } = req.body;
  const updatedProduct = await database.updateProduct(
    productId,
    productDescription,
    pricePerUnit,
  );

  return updatedProduct[0].productId
    ? res.status(200).send({})
    : res.status(500).send({});
}
