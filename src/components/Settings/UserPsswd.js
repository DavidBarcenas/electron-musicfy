import React, { useState } from 'react';
import { Button, Form, Icon, Input } from 'semantic-ui-react';

export const UserPsswd = ({ setShowModal, setTitleModal, setContentModal }) => {
  const onEdit = () => {
    setTitleModal('Actualizar contraseña');
    setContentModal(<ChangePsswdForm />);
    setShowModal(true);
  };

  return (
    <div className="user-psswd">
      <h3>Contraseña: *** *** *** ***</h3>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
};

function ChangePsswdForm() {
  const [loading, setloading] = useState(false);

  const onSubmit = () => {
    console.log('enviando form');
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          type="password"
          placeholder="Contraseña actual"
          icon={<Icon name="eye" link />}
        />
      </Form.Field>
      <Form.Field>
        <Input
          type="password"
          placeholder="Nueva contraseña"
          icon={<Icon name="eye" link />}
        />
      </Form.Field>
      <Form.Field>
        <Input
          type="password"
          placeholder="Repetir nueva contraseña"
          icon={<Icon name="eye" link />}
        />
      </Form.Field>
      <Button type="submit" loading={loading}>
        Actualizar contraseña
      </Button>
    </Form>
  );
}
