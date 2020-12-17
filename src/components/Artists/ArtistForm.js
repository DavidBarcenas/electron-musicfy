import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { Button, Form, Image, Input } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../utils/firebase';
import 'firebase/storage';
import NoImage from '../../assets/img/no-image.png';

export const ArtistForm = ({ setShowModal }) => {
  const [banner, setBanner] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFile(file);
    setBanner(URL.createObjectURL(file));
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    onDrop,
  });

  const uploadImage = (fileName) => {
    const ref = firebase.storage().ref().child(`artist/${fileName}`);
    return ref.put(file);
  };

  const onSubmit = () => {
    if (!formData.name) {
      toast.warning('Añade el nombre del artista');
    } else if (!file) {
      toast.warning('Añade el banner del artista');
    } else {
      setLoading(true);
      const fileName = uuidv4();
      uploadImage(fileName)
        .then(() => {
          toast.success('Imagen subida correctamente.');
          setLoading(false);
          setShowModal(false);
        })
        .catch(() => {
          toast.success('Error al subir la imagen.');
          setLoading(false);
        });
    }
  };

  return (
    <Form className="add-artist-form" onSubmit={onSubmit}>
      <Form.Field className="artist-banner">
        <div
          className="banner"
          {...getRootProps()}
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        <input {...getInputProps()} />
        {!banner && <Image src={NoImage} />}
      </Form.Field>
      <Form.Field className="artist-avatar">
        <div
          className="avatar"
          style={{ backgroundImage: `url(${banner ? banner : NoImage})` }}
        ></div>
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Nombre del artista"
          onChange={(e) => setFormData({ name: e.target.value })}
        />
      </Form.Field>
      <Button type="submit" loading={loading}>
        Crear artista
      </Button>
    </Form>
  );
};
