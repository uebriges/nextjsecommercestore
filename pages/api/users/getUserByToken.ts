import { NextApiRequest, NextApiResponse } from 'next';
import * as database from '../../../utils/database';

export default async function getUserByToken(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await database.getUserByToken(req.body.token);
  user ? res.status(200).send(user) : res.status(500).send({});
}
