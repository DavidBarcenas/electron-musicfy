import React, { useCallback, useState } from 'react';
import { Image } from 'semantic-ui-react';
import NoAvatar from '../../assets/img/user.png';
import firebase from '../../utils/firebase';
import 'firebase/storage';
import 'firebase/auth';
import { useDropzone } from 'react-dropzone';

export const UploadAvatar = ({ user }) => {
  const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

  const onDrop = useCallback((accptedFiles) => {
    console.log(accptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="user-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image src={NoAvatar} />
      ) : (
        <Image src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
};
