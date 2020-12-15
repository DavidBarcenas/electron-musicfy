import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import firebase from '../../utils/firebase';
import 'firebase/auth';
import { toast } from 'react-toastify';

export const UserName = ({
  user,
  setShowModal,
  setTitleModal,
  setContentModal,
  setReloadApp,
}) => {
  const onEdit = () => {
    setTitleModal('Actualizar Nombre');
    setContentModal(
      <ChangeDisplayNameForm
        displayName={user.displayName}
        setShowModal={setShowModal}
        setReloadApp={setReloadApp}
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

function ChangeDisplayNameForm({ displayName, setShowModal, setReloadApp }) {
  const [formData, setformData] = useState(displayName);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    if (!formData || formData === displayName) {
      setShowModal(false);
    } else {
      setLoading(true);
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: formData,
        })
        .then(() => {
          toast.success('Nombre actualizado');
          setReloadApp(true);
        })
        .catch(() => toast.error('Error al actualizar el nombre'))
        .finally(() => setShowModal(false));
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={displayName}
          onChange={(e) => setformData(e.target.value)}
        />
      </Form.Field>
      <Button type="submit" loading={loading}>
        Actualizar nombre
      </Button>
    </Form>
  );
}
