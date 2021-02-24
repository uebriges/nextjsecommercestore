import argon2 from 'argon2';
import crypto from 'crypto';
import Tokens from 'csrf';
import cookies from '../../../utils/cookies';
import database from '../../../utils/database';
export default async function handler(req, res) {
  // read body from req
  const { token, username, password } = req.body;
  const tokens = new Tokens();

  // check if the secret is available on the server

  console.log('process.env.CSRF_TOKEN_SECRET: ', process.env.CSRF_TOKEN_SECRET);
  if (process.env.CSRF_TOKEN_SECRET === '') {
    return res.status(500).send({ success: false });
  }

  // check if token is valid
  console.log('3');
  if (!tokens.verify(process.env.CSRF_TOKEN_SECRET, token)) {
    return res.status(401).send({ success: false });
  }

  // check if username or password correct
  console.log(
    '!(await database.userNameExists(username))',
    !(await database.userNameExists(username)),
  );
  console.log(
    '!(await database.passwordValid(username, password)',
    !(await database.passwordValid(username, password)),
  );

  if (!(await database.userNameExists(username))) {
    return res.status(401).send({ success: false });
  } else {
    const user = await database.getUserByUserName(username);
    let passwordOk;
    if (user[0].passwordHash) {
      passwordOk = await argon2.verify(user[0].passwordHash, password);
    }

    if (passwordOk) {
      const sessionToken = crypto.randomBytes(24).toString('base64');
      if (user && token) {
        console.log('user.customerId: ', user[0].customerId);
        database.createSession(user[0].customerId, token);
        cookies.setCookiesClientSide('token', JSON.stringify(sessionToken));
        return res.status(200).send({ success: true });
      }
    } else {
      return res.status(401).send({ success: false });
    }
  }
  return res.status(200).send({ success: true });
}
