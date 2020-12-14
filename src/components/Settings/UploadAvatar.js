import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import NoAvatar from '../../assets/img/user.png';

export const UploadAvatar = ({ user }) => {
  const [avatarUrl, setAvatarUrl] = useState(user.photoURL);
  return (
    <div className="user-avatar">
      <Image src={avatarUrl ? avatarUrl : NoAvatar} />
    </div>
  );
};
