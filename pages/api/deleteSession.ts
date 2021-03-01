import { NextApiRequest, NextApiResponse } from 'next';
import * as database from '../../utils/database';

export default async function deleteSession(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let deletedSession;
  const token = req.body.token;
  if (token) {
    deletedSession = await database.deleteSession(token);
    res.status(200).send(deletedSession[0]);
  } else {
    res.status(500).send({});
  }
}
