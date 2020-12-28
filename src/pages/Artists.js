import React, { useEffect, useState } from 'react';
import firebase from '../utils/firebase';
import 'firebase/firestore';

export const Artists = () => {
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection('artists')
      .get()
      .then((resp) => {
        const artistsTemp = [];
        resp?.docs.map((artist) => {
          return artistsTemp.push({ ...artist.data(), id: artist.id });
        });
        setArtists(artistsTemp);
      });
  }, []);

  return (
    <div>
      <h2>Artistas</h2>
    </div>
  );
};
