import React, { useCallback, useState } from 'react';
import { Image } from 'semantic-ui-react';
import NoAvatar from '../../assets/img/user.png';
import firebase from '../../utils/firebase';
import 'firebase/storage';
import 'firebase/auth';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

export const UploadAvatar = ({ user, setReloadApp }) => {
  const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

  const onDrop = useCallback((accptedFiles) => {
    const file = accptedFiles[0];
    setAvatarUrl(URL.createObjectURL(file));
    uploadImage(file).then(() => {
      updateUserAvatar();
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    onDrop,
  });

  const uploadImage = (file) => {
    const ref = firebase.storage().ref().child(`avatar/${user.uid}`);
    return ref.put(file);
  };

  const updateUserAvatar = () => {
    firebase
      .storage()
      .ref(`avatar/${user.uid}`)
      .getDownloadURL()
      .then(async (resp) => {
        await firebase.auth().currentUser.updateProfile({ photoURL: resp });
        setReloadApp((prevState) => !prevState);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error al actualizar el avatar.');
      });
  };

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
