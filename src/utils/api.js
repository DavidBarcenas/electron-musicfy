import firebaseApp from './firebase';
import 'firebase/firestore';

const db = firebaseApp.firestore();

export async function isUserAdmnin(uid) {
  const resp = await db.collection('admins').doc(uid).get();
  return resp.exists;
}
