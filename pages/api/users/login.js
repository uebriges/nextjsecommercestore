import Tokens from 'csrf';
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
  console.log('4');

  if (
    !(await database.userNameExists(username)) ||
    !(await database.passwordValid(username, password))
  ) {
    return res.status(401).send({ success: false });
  } else {
    console.log('5');
    const sessionToken = crypto.randomBytes(24).toString('base64');

    return res.status(200).send({ success: true });
  }
}
