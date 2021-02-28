// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { persistOrder } from '../../utils/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const persistedOrder = await persistOrder(
      req.body.shoppingCart,
      req.body.deliveryOptionId,
      req.body.customerId,
    );
    res.json(persistedOrder);
  }
}
