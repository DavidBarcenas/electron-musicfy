import React from 'react';
import { Button, Dropdown, Form, Input } from 'semantic-ui-react';

const onSubmit = () => {
  console.log('enviando formulario...');
};

export const AddSongForm = (setShowModal) => {
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
          options={[]}
        />
      </Form.Field>
      <Form.Field>
        <div>UploadSong</div>
      </Form.Field>
      <Button type="submit">Subir canción</Button>
    </Form>
  );
};
