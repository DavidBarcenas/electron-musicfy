import React, { useState } from 'react';
import firebase from './utils/firebase';
import { ToastContainer } from 'react-toastify';
import { Auth } from './pages/Auth';
import { LoggedLayout } from './Layout';
import 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reloadApp, setReloadApp] = useState(false);

  firebase.auth().onAuthStateChanged((currentUser) => {
    if (!currentUser?.emailVerified) {
      firebase.auth().signOut();
      setUser(null);
    } else {
      setUser(currentUser);
    }

    setLoading(false);
  });

  if (loading) {
    return null;
  }

  return (
    <>
      {user ? (
        <LoggedLayout user={user} setReloadApp={setReloadApp} />
      ) : (
        <Auth />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibiliteChange
        draggable
        pauseOnHover={false}
      />
    </>
  );
}

export default App;
