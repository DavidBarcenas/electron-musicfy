import React from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

export const ArtistForm = () => {
  const onSubmit = () => {
    console.log('creando artista');
  };

  return (
    <Form className="add-artist-form" onSubmit={onSubmit}>
      <Form.Field className="artist-banner">
        <input type="file" />
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
