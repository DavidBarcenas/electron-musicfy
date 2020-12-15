import React from 'react';
import { Button } from 'semantic-ui-react';
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
    setContentModal(<h3>Formulario</h3>);
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
