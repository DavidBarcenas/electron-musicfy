import React, { useState } from 'react';
import { BasicModal } from '../components/Modal';
import { UploadAvatar } from '../components/Settings/UploadAvatar';
import { UserName } from '../components/Settings/UserName';

export const Settings = ({ user, setReloadApp }) => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [contentModal, setContentModal] = useState(null);

  return (
    <div className="settings">
      <h1>Configuración</h1>
      <div className="avatar-name">
        <UploadAvatar user={user} setReloadApp={setReloadApp} />
        <UserName
          user={user}
          setShowModal={setShowModal}
          setTitleModal={setTitleModal}
          setContentModal={setContentModal}
          setReloadApp={setReloadApp}
        />
      </div>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal>
    </div>
  );
};
