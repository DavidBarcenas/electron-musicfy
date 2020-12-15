import React, { useState } from 'react';
import { Button, Form, Icon, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import firebase from '../../utils/firebase';
import 'firebase/auth';
import { reauthenticate } from '../../utils/api';

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
  const [formData, setformData] = useState({
    email: '',
    psswd: '',
  });
  const [showPsswd, setShowPsswd] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    if (!formData.email || !formData.psswd) {
      setShowModal(false);
    } else {
      setLoading(true);
      reauthenticate(formData.psswd)
        .then(() => {})
        .catch(() => {});
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          type="email"
          defaultValue={email}
          onChange={(e) => setformData({ ...formData, email: e.target.value })}
        />
      </Form.Field>
      <Form.Field>
        <Input
          type={showPsswd ? 'test' : 'password'}
          placeholder="Contraseña"
          icon={
            <Icon
              name={showPsswd ? 'eye slash outline' : 'eye'}
              onClick={() => setShowPsswd(!showPsswd)}
              link
            />
          }
          onChange={(e) => setformData({ ...formData, psswd: e.target.value })}
        />
      </Form.Field>
      <Button type="submit" loading={loading}>
        Actualizar email
      </Button>
    </Form>
  );
}
