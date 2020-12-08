import React, { useState } from 'react';
import firebase from './utils/firebase';
import { Auth } from './pages/Auth';
import 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  firebase.auth().onAuthStateChanged((currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }

    setLoading(false);
  });

  if (loading) {
    return null;
  }

  return user ? <UserLogged /> : <Auth />;
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
