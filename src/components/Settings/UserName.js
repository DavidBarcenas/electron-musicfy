import React from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import firebase from '../../utils/firebase';
import 'firebase/auth';

export const UserName = ({
  user,
  setShowModal,
  setTitleModal,
  setContentModal,
}) => {
  const onEdit = () => {
    setTitleModal('Actualizar Nombre');
    setContentModal(
      <ChangeDisplayNameForm
        displayName={user.displayName}
        setShowModal={setShowModal}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="user-name">
      <h2>{user.displayName}</h2>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
};

function ChangeDisplayNameForm({ displayName, setShowModal }) {
  const onSubmit = () => {
    console.log('actualizando nombre de usuario');
    setShowModal(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input defaultValue={displayName} />
      </Form.Field>
      <Button type="submit">Actualizar nombre</Button>
    </Form>
  );
}
