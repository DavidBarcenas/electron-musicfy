import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BannerArtist } from '../components/Artists/BannerArtist';
import { BasicSlider } from '../components/Sliders/BasicSlider';
import { SongSlider } from '../components/Sliders/SongSlider';
import firebase from '../utils/firebase';
import 'firebase/firestore';

export const Artist = ({ playerSong }) => {
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
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

  useEffect(() => {
    const arraySongs = [];
    (async () => {
      await Promise.all(
        albums.map(async (album) => {
          await firebase
            .firestore()
            .collection('songs')
            .where('album', '==', album.id)
            .get()
            .then((resp) => {
              resp?.docs.map((song) => {
                return arraySongs.push({ ...song.data(), id: song.id });
              });
            });
        })
      );
      setSongs(arraySongs);
    })();
  }, [albums]);

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
      <SongSlider title="Canciones" data={songs} playerSong={playerSong} />
    </div>
  );
};
