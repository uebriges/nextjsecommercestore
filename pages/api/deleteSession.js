import database from '../../utils/database';

export default async function deleteSession(req, res) {
  console.log('request body: delete session', req.body);
  let deletedSession;
  const token = req.body.token;
  console.log('delete Sessio - : token: ', token);
  if (token) {
    console.log('delete Sessio - : token available');
    deletedSession = await database.deleteSession(token);
    res.status(200).send(deletedSession[0]);
    console.log('delete Sessio - : deletedSession', deletedSession);
  } else {
    res.status(500).send();
  }
}
