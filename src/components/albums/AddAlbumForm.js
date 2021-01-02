import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Dropdown, Form, Image, Input } from 'semantic-ui-react';
import NoImage from '../../assets/img/no-image.png';
import firebase from '../../utils/firebase';
import 'firebase/firestore';

export const AddAlbumForm = ({ setShowModal }) => {
  const [albumImage, setAlbumImage] = useState(null);
  const [file, setFile] = useState(null);
  const [artists, setArtists] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    artists: '',
  });

  useEffect(() => {
    firebase
      .firestore()
      .collection('artists')
      .get()
      .then((resp) => {
        const arrayArtists = [];
        resp.docs.map((item) => {
          const data = item.data();
          return arrayArtists.push({
            key: item.id,
            value: item.id,
            text: data.name,
          });
        });
        setArtists(arrayArtists);
      });
  }, []);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFile(file);
    setAlbumImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    onDrop,
  });

  const onSubmit = () => {
    console.log('enviando form...', formData);
  };

  return (
    <Form className="add-album-form" onSubmit={onSubmit}>
      <Form.Group>
        <Form.Field className="album-avatar" width={5}>
          <div
            {...getRootProps()}
            className="album-image"
            style={{ backgroundImage: `url(${albumImage})` }}
          ></div>
          <input {...getInputProps()} />
          {!albumImage && <Image src={NoImage} />}
        </Form.Field>
        <Form.Field className="album-inputs" width={11}>
          <Input
            placeholder="Nombre del album"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Dropdown
            placeholder="El album pertenece..."
            search
            fluid
            selection
            lazyLoad
            options={artists}
            onChange={(e, data) =>
              setFormData({ ...formData, artists: data.value })
            }
          />
        </Form.Field>
      </Form.Group>
      <Button type="submit">Crear album</Button>
    </Form>
  );
};
