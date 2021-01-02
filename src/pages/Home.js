import React, { useEffect, useState } from 'react';
import { BasicSlider } from '../components/Sliders/BasicSlider';
import { BannerHome } from '../components/BannerHome';
import firebase from '../utils/firebase';
import 'firebase/firestore';

export const Home = () => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);

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
            return arrayArtists.push(data);
          });
          setArtists(arrayArtists);
        }
      });
  }, []);

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
    <div className="home">
      <BannerHome />
      <div className="home-main">
        <BasicSlider
          title="Ultimos artistas"
          data={artists}
          folder="artists"
          urlName="artist"
        />

        <BasicSlider
          title="Ultimos álbumes"
          data={albums}
          folder="album"
          urlName="albums"
        />
      </div>
    </div>
  );
};
