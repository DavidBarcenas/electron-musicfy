import React, { useEffect, useState } from 'react';
import firebase from '../../utils/firebase';
import 'firebase/storage';

export const BannerArtist = ({ artist }) => {
  const [bannerURL, setBannerURL] = useState(null);
  useEffect(() => {
    firebase
      .storage()
      .ref(`artists/${artist?.banner}`)
      .getDownloadURL()
      .then((url) => {
        setBannerURL(url);
      });
  }, [artist]);

  return (
    <div
      className="banner-artist"
      style={{ backgroundImage: `url(${bannerURL})` }}
    >
      <div className="banner-artist-name">
        <p>Artista</p>
        <h2>{artist.name}</h2>
      </div>
    </div>
  );
};
