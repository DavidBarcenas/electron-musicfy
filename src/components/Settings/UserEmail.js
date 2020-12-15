import React, { useState } from 'react';
import { Button, Form, Icon, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import firebase from '../../utils/firebase';
import 'firebase/auth';

export const UserEmail = ({
  user,
  setShowModal,
  setTitleModal,
  setContentModal,
}) => {
  const onEdit = () => {
    setTitleModal('Actualizar email');
    setContentModal(
      <ChangeEmailForm email={user.email} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };

  return (
    <div className="user-email">
      <h3>Email: {user.email}</h3>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
};

function ChangeEmailForm({ email, setShowModal }) {
  const [formData, setformData] = useState(email);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    if (!formData || formData === email) {
      setShowModal(false);
    } else {
      setLoading(true);
      firebase
        .auth()
        .currentUser.updateProfile({
          email: formData,
        })
        .then(() => toast.success('Email actualizado'))
        .catch(() => toast.error('Error al actualizar el email'))
        .finally(() => setShowModal(false));
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          type="email"
          defaultValue={email}
          onChange={(e) => setformData(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <Input
          type="password"
          placeholder="Contraseña"
          icon={<Icon name="eye" link />}
          onChange={(e) => setformData(e.target.value)}
        />
      </Form.Field>
      <Button type="submit" loading={loading}>
        Actualizar email
      </Button>
    </Form>
  );
}
