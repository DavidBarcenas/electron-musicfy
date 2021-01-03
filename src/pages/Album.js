import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';

export const Album = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [albumImage, setAlbumImage] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection('albums')
      .doc(id)
      .get()
      .then((resp) => setAlbum(resp.data()))
      .catch((err) => console.log('No se pudo obtener el álbum.'));
  }, [id]);

  useEffect(() => {
    if (album) {
      firebase
        .storage()
        .ref()
        .child(`album/${album?.banner}`)
        .getDownloadURL()
        .then((url) => setAlbumImage(url))
        .catch((err) => console.log('No se pudo obtener la imagen del álbum'));
    }
  }, [album]);

  return (
    <div>
      <h1>Album</h1>
    </div>
  );
};
