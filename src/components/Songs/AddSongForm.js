import React, { useCallback, useEffect, useState } from 'react';
import { Button, Dropdown, Form, Icon, Input } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import firebase from '../../utils/firebase';
import 'firebase/firestore';

export const AddSongForm = (setShowModal) => {
  const [albums, setAlbums] = useState([]);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    album: '',
  });

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

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFile(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.mp3',
    noKeyboard: true,
    onDrop,
  });

  const onSubmit = () => {
    console.log('enviando formulario...', formData);
  };

  return (
    <Form className="add-song-form" onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Nombre de la canción"
          onChange={({ target }) =>
            setFormData({ ...formData, name: target.value })
          }
          value={formData.name}
        />
      </Form.Field>
      <Form.Field>
        <Dropdown
          placeholder="Asigna la canción a un álbum"
          search
          selection
          lazyLoad
          options={albums}
          onChange={(e, data) =>
            setFormData({ ...formData, album: data.value })
          }
        />
      </Form.Field>
      <Form.Field>
        <div {...getRootProps()} className="song-upload">
          <input {...getInputProps()} />
          <Icon name="cloud upload" className={file && 'load'} />
          <div>
            <p>Arrastra tu canción o haz click aquí</p>
            {file && (
              <p>
                Canción subida: <span>{file.name}</span>
              </p>
            )}
          </div>
        </div>
      </Form.Field>
      <Button type="submit">Subir canción</Button>
    </Form>
  );
};
