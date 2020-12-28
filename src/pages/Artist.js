import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import firebase from '../utils/firebase';
import { BannerArtist } from '../components/Artists/BannerArtist';
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
    <div className="artist">{artist && <BannerArtist artist={artist} />}</div>
  );
};
