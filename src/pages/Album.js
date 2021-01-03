import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import { Loader } from 'semantic-ui-react';

export const Album = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [albumImage, setAlbumImage] = useState(null);
  const [artist, setArtist] = useState(null);

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

  useEffect(() => {
    if (album) {
      firebase
        .firestore()
        .collection('artists')
        .doc(album.artist)
        .get()
        .then((resp) => setArtist(resp.data()))
        .catch((err) =>
          console.log('No se pudo obtener la información del artista.')
        );
    }
  }, [album]);

  if (!album || !artist) {
    return <Loader active>Cargando...</Loader>;
  }

  return (
    <div className="album">
      <div className="album-header">
        <div
          className="image"
          style={{ backgroundImage: `url(${albumImage})` }}
        ></div>
        <div className="album-info">
          <h1>{album.name}</h1>
          <p>
            De <span className="album-artist">{artist.name}</span>
          </p>
        </div>
      </div>
      <div className="album-songs">
        <p>Lista de canciones...</p>
      </div>
    </div>
  );
};
