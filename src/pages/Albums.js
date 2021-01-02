import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import { Link } from 'react-router-dom';

export const Albums = () => {
  const [albums, setAlbums] = useState([]);
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
    <div className="albums">
      <h1>Álbumes</h1>
      <Grid>
        {albums.map((album) => (
          <Grid.Column key={album.id} mobile={8} tablet={4} computer={3}>
            <Album album={album} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

function Album({ album }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref(`album/${album.banner}`)
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      })
      .catch((err) => console.log('No se pudo obtener la imagen.'));
  }, [album]);

  return (
    <Link to={`/album/${album.id}`}>
      <div className="album-item">
        <div
          className="avatar"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <h3>{album.name}</h3>
      </div>
    </Link>
  );
}
