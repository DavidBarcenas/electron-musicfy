import React from 'react';
import { UploadAvatar } from '../components/Settings/UploadAvatar';

export const Settings = ({ user }) => {
  return (
    <div className="settings">
      <h1>Configuración</h1>
      <div className="avatar-name">
        <UploadAvatar user={user} />
        <h2>User name</h2>
      </div>
    </div>
  );
};
