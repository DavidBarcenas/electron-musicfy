import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Icon, Input } from 'semantic-ui-react';
import { alertErrors } from '../../utils/alertErrors';
import { reauthenticate } from '../../utils/api';
import firebase from '../../utils/firebase';
import 'firebase/auth';

export const UserPsswd = ({ setShowModal, setTitleModal, setContentModal }) => {
  const onEdit = () => {
    setTitleModal('Actualizar contraseña');
    setContentModal(<ChangePsswdForm setShowModal={setShowModal} />);
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

const initShowPsswd = {
  current: false,
  new: false,
  repeat: false,
};

function ChangePsswdForm({ setShowModal }) {
  const [loading, setloading] = useState(false);
  const [showPsswd, setShowPsswd] = useState(initShowPsswd);
  const [formData, setFormData] = useState({
    current: '',
    new: '',
    repeat: '',
  });

  const handleShowPsswd = (field) =>
    setShowPsswd({ ...initShowPsswd, [field]: !showPsswd[field] });

  const handleChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  const onSubmit = () => {
    if (!formData.current || !formData.new || !formData.repeat) {
      toast.warning('Todos los campos son obligatorios.');
    } else if (formData.current === formData.new) {
      toast.warning('La contraseña nueva no puede ser igual a la actual.');
    } else if (formData.new !== formData.repeat) {
      toast.warning('La nueva contraseña no coincide.');
    } else if (formData.new.length < 6) {
      toast.warning('La nueva contraseña tiene que tener minimo 6 caracteres.');
    } else {
      setloading(true);
      reauthenticate(formData.current)
        .then(() => {
          const currentUser = firebase.auth().currentUser;
          currentUser
            .updatePassword(formData.new)
            .then(() => {
              toast.success('Contraseña actualizada.');
              setloading(false);
              setShowModal(false);
              firebase.auth().signOut();
            })
            .catch((error) => alertErrors(error.code));
        })
        .catch((error) => {
          setloading(false);
          alertErrors(error.code);
          return false;
        });
    }
  };

  return (
    <Form onSubmit={onSubmit} onChange={handleChange}>
      <Form.Field>
        <Input
          type={showPsswd.current ? 'text' : 'password'}
          placeholder="Contraseña actual"
          name="current"
          icon={
            <Icon
              name={showPsswd.current ? 'eye slash outline' : 'eye'}
              link
              onClick={() => handleShowPsswd('current')}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          type={showPsswd.new ? 'text' : 'password'}
          name="new"
          placeholder="Nueva contraseña"
          icon={
            <Icon
              name={showPsswd.new ? 'eye slash outline' : 'eye'}
              link
              onClick={() => handleShowPsswd('new')}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          type={showPsswd.repeat ? 'text' : 'password'}
          name="repeat"
          placeholder="Repetir nueva contraseña"
          icon={
            <Icon
              name={showPsswd.repeat ? 'eye slash outline' : 'eye'}
              link
              onClick={() => handleShowPsswd('repeat')}
            />
          }
        />
      </Form.Field>
      <Button type="submit" loading={loading}>
        Actualizar contraseña
      </Button>
    </Form>
  );
}
