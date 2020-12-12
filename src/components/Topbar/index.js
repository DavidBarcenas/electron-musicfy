import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';
import UserImage from '../../assets/img/user.png';
import firebase from '../../utils/firebase';
import 'firebase/auth';

export const Topbar = ({ user }) => {
  const history = useHistory();
  const goBack = () => history.goBack();
  const handleLogout = () => firebase.auth().signOut();

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <Icon name="angle left" onClick={goBack} />
      </div>
      <div className="top-bar-right">
        <Link to="/settings">
          <Image src={UserImage} />
          {user.displayName}
        </Link>
        <Icon name="power off" onClick={handleLogout} />
      </div>
    </div>
  );
};
