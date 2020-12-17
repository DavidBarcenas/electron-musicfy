import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Form, Input } from 'semantic-ui-react';
import NoImage from '../../assets/img/no-image.png';

export const ArtistForm = ({ setShowModal }) => {
  const [banner, setBanner] = useState(null);
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFile) => {
    console.log(acceptedFile);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    onDrop,
  });

  const onSubmit = () => {
    console.log('creando artista');
    setShowModal(false);
  };

  return (
    <Form className="add-artist-form" onSubmit={onSubmit}>
      <Form.Field className="artist-banner">
        <div className="banner" {...getRootProps()}></div>
        <input {...getInputProps()} />
      </Form.Field>
      <Form.Field className="artist-avatar">
        <div>Avatar</div>
      </Form.Field>
      <Form.Field>
        <Input placeholder="Nombre del artista" />
      </Form.Field>
      <Button type="submit">Crear artista</Button>
    </Form>
  );
};
