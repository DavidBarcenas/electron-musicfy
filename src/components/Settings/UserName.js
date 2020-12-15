import React from 'react';
import { Button } from 'semantic-ui-react';
import firebase from '../../utils/firebase';
import 'firebase/auth';

export const UserName = ({ user }) => {
  const onEdit = () => {
    console.log('Editando nombre de usuario');
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
