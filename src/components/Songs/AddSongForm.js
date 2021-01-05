import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Form, Input } from 'semantic-ui-react';
import firebase from '../../utils/firebase';
import 'firebase/firestore';

const onSubmit = () => {
  console.log('enviando formulario...');
};

export const AddSongForm = (setShowModal) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('albums')
      .get()
      .then((resp) => {
        const arrayAlbums = [];
        resp?.docs.map((album) => {
          return arrayAlbums.push({
            key: album.id,
            value: album.id,
            text: album.data().name,
          });
        });
        setAlbums(arrayAlbums);
      });
  }, []);

  return (
    <Form className="add-song-form" onSubmit={onSubmit}>
      <Form.Field>
        <Input placeholder="Nombre de la canción" />
      </Form.Field>
      <Form.Field>
        <Dropdown
          placeholder="Asigna la canción a un álbum"
          search
          selection
          lazyLoad
          options={albums}
        />
      </Form.Field>
      <Form.Field>
        <div>UploadSong</div>
      </Form.Field>
      <Button type="submit">Subir canción</Button>
    </Form>
  );
};
