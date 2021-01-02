import React from 'react';
import { Button, Dropdown, Form, Input } from 'semantic-ui-react';

export const AddAlbumForm = ({ setShowModal }) => {
  const onSubmit = () => {
    console.log('enviando form...');
  };

  return (
    <Form className="add-album-form" onSubmit={onSubmit}>
      <Form.Group>
        <Form.Field className="album-avatar" width={5}>
          <h2>Avatar</h2>
        </Form.Field>
        <Form.Field className="album-inputs" width={11}>
          <Input placeholder="Nombre del album" />
          <Dropdown placeholder="El album pertenece..." search />
        </Form.Field>
      </Form.Group>
      <Button type="submit">Crear album</Button>
    </Form>
  );
};
