import React, { useState } from 'react';
import { BasicModal } from '../components/Modal';
import { UploadAvatar } from '../components/Settings/UploadAvatar';
import { UserEmail } from '../components/Settings/UserEmail';
import { UserName } from '../components/Settings/UserName';
import { UserPsswd } from '../components/Settings/UserPsswd';

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
      <UserEmail
        user={user}
        setShowModal={setShowModal}
        setTitleModal={setTitleModal}
        setContentModal={setContentModal}
      />
      <UserPsswd
        setShowModal={setShowModal}
        setTitleModal={setTitleModal}
        setContentModal={setContentModal}
      />
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal>
    </div>
  );
};
