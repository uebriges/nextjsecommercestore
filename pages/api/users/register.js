import argon2 from 'argon2';
import Tokens from 'csrf';
import database from '../../../utils/database';
export default async function handler(req, res) {
  const { username, email, password, token } = req.body;

  const tokens = new Tokens();

  const secret = process.env.CSRF_TOKEN_SECRET;

  if (typeof secret === 'undefined') {
    res.status(500).send({ success: false });
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured!');
  }

  console.log('before verification');
  console.log('secret: ', secret);
  console.log('token: ', token);

  // Verify the CSRF token sent by the client
  const verified = tokens.verify(secret, token);

  if (!verified) {
  }

  console.log('After verification');
  if (!verified) {
    // HTTP status code: 401 Unauthorized
    return res.status(401).send({ success: false });
  }

  // Does the user name exist already?

  if (await database.userNameExists(username)) {
    res.status(409).send({ success: false });
  } else {
    const newUser = await database.registerUser(
      username,
      email,
      await argon2.hash(password),
    );
    console.log('new User: ', newUser);
    if (newUser) {
      res.status(200).send({ success: true });
    }
  }
}
