// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { persistOrder } from '../../utils/database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const persistedOrder = await persistOrder(
      req.body.shoppingCart,
      req.body.deliveryOptionId,
      req.body.customerId,
    );
    res.json(persistedOrder);
  }
}
