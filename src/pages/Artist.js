import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import firebase from '../utils/firebase';
import 'firebase/firestore';

export const Artist = () => {
  const [artist, setArtist] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    firebase
      .firestore()
      .collection('artists')
      .doc(id)
      .get()
      .then((artist) => setArtist(artist.data()));
  }, [id]);

  return (
    <div>
      <h1>Artist</h1>
    </div>
  );
};
