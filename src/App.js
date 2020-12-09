import React, { useState } from 'react';
import firebase from './utils/firebase';
import { ToastContainer } from 'react-toastify';
import { Auth } from './pages/Auth';
import 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      {user ? <UserLogged /> : <Auth />}
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

function UserLogged() {
  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <div>
      <h1>Usuario Logeado</h1>
      <button onClick={logout}>Cerrar sesion</button>
    </div>
  );
}

export default App;
