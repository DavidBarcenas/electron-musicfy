import React, { useEffect, useState } from 'react';
import { BannerHome } from '../components/BannerHome';
import firebase from '../utils/firebase';
import 'firebase/firestore';

export const Home = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('artists')
      .get()
      .then((data) => {
        const arrayArtists = [];
        if (data.docs.length > 0) {
          data.docs.map((artist) => {
            const data = artist.data();
            data.id = artist.id;
            arrayArtists.push(data);
          });
          setArtists(arrayArtists);
        }
      });
  }, []);

  return (
    <div className="home">
      <BannerHome />
      <div className="home-main"></div>
    </div>
  );
};
