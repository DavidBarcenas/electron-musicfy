import React from 'react';
import { UploadAvatar } from '../components/Settings/UploadAvatar';
import { UserName } from '../components/Settings/UserName';

export const Settings = ({ user, setReloadApp }) => {
  return (
    <div className="settings">
      <h1>Configuración</h1>
      <div className="avatar-name">
        <UploadAvatar user={user} setReloadApp={setReloadApp} />
        <UserName user={user} />
      </div>
    </div>
  );
};
