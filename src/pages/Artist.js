import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import firebase from '../utils/firebase';
import { BannerArtist } from '../components/Artists/BannerArtist';
import 'firebase/firestore';
import { BasicSlider } from '../components/Sliders/BasicSlider';

export const Artist = () => {
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    firebase
      .firestore()
      .collection('artists')
      .doc(id)
      .get()
      .then((artist) => setArtist(artist.data()));
  }, [id]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('albums')
      .where('artist', '==', id)
      .get()
      .then((resp) => {
        const albumsTemp = [];
        resp?.docs.map((album) => {
          return albumsTemp.push({ ...album.data(), id: album.id });
        });
        setAlbums(albumsTemp);
      });
  }, [id]);

  return (
    <div className="artist">
      {artist && <BannerArtist artist={artist} />}
      <div className="artist-slider">
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
