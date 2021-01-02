import React, { useEffect, useState } from 'react';
import firebase from '../utils/firebase';
import 'firebase/firestore';

export const Albums = () => {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection('albums')
      .get()
      .then((data) => {
        const arrayAlbums = [];
        if (data.docs.length > 0) {
          data.docs.map((album) => {
            const data = album.data();
            data.id = album.id;
            return arrayAlbums.push(data);
          });
          setAlbums(arrayAlbums);
        }
      });
  }, []);
  return (
    <div className="albums">
      <h1>Álbumes</h1>
    </div>
  );
};
