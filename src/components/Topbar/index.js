import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';
import UserImage from '../../assets/img/user.png';

export const Topbar = ({ user }) => {
  const goBack = () => {
    console.log('Go back!!!');
  };

  const handleLogout = () => {
    console.log('cerrar sesión');
  };

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
