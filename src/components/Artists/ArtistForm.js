import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Form, Image, Input } from 'semantic-ui-react';
import NoImage from '../../assets/img/no-image.png';

export const ArtistForm = ({ setShowModal }) => {
  const [banner, setBanner] = useState(null);
  const [file, setFile] = useState(null);

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

  const onSubmit = () => {
    console.log('creando artista');
    setShowModal(false);
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
        <Input placeholder="Nombre del artista" />
      </Form.Field>
      <Button type="submit">Crear artista</Button>
    </Form>
  );
};
