import argon2 from 'argon2';
import crypto from 'crypto';
import Tokens from 'csrf';
import { NextApiRequest, NextApiResponse } from 'next';
import * as cookies from '../../../utils/cookies';
import * as database from '../../../utils/database';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // read body from req
  const { token, username, password } = req.body;
  const tokens = new Tokens();

  // check if the secret is available on the server

  if (process.env.CSRF_TOKEN_SECRET === '') {
    return res.status(500).send({ success: false });
  }

  // check if token is valid
  const tokenSecret = process.env.CSRF_TOKEN_SECRET
    ? process.env.CSRF_TOKEN_SECRET
    : '';
  if (!tokens.verify(tokenSecret, token)) {
    return res.status(401).send({ success: false });
  }

  // check if username or password correct

  if (!(await database.userNameExists(username))) {
    res.status(401).send({ success: false });
  } else {
    const user = await database.getUserByUserName(username);
    let passwordOk;
    if (user[0].passwordHash) {
      passwordOk = await argon2.verify(user[0].passwordHash, password);
    }

    if (passwordOk) {
      const sessionToken = crypto.randomBytes(24).toString('base64');
      if (user && sessionToken) {
        database.createSession(user[0].customerId, sessionToken);
        cookies.setCookiesClientSide('token', sessionToken);
        res.status(200).send({
          success: true,
          token: sessionToken,
          isAdmin: user[0].admin,
          customerId: user[0].customerId,
        });
      }
    } else {
      res.status(401).send({ success: false });
    }
  }
}
