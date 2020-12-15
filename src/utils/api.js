import firebaseApp from './firebase';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const db = firebaseApp.firestore();

export async function isUserAdmnin(uid) {
  const resp = await db.collection('admins').doc(uid).get();
  return resp.exists;
}

export const reauthenticate = (psswd) => {
  const user = firebase.auth().currentUser;
  const credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    psswd
  );

  return user.reauthenticateWithCredential(credentials);
};
