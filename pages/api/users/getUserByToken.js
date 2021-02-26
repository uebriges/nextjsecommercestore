import database from '../../../utils/database';

export default async function getUserByToken(req, res) {
  console.log('body: ', req.body);

  const user = await database.getUserByToken(req.body.token);
  console.log('user: ', user);
  user ? res.status(200).send(user) : res.status(500).send({});
}
