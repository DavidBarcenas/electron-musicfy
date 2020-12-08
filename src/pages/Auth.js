import React, { useState } from 'react';
import { LoginForm } from '../components/Auth/LoginForm';
import { RegisterForm } from '../components/Auth/RegisterForm';
import { AuthOptions } from '../components/Auth/AuthOptions';
import LogoWhite from '../assets/img/logo-name-white.png';

export const Auth = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  const handleForm = () => {
    switch (selectedForm) {
      case 'login':
        return <LoginForm />;
      case 'register':
        return <RegisterForm setSelectedForm={setSelectedForm} />;

      default:
        return <AuthOptions setSelectedForm={setSelectedForm} />;
    }
  };

  return (
    <div className="auth">
      <div className="auth-box">
        <div className="auth-box-logo">
          <img src={LogoWhite} alt="Musicfy" />
        </div>
        {handleForm()}
      </div>
    </div>
  );
};
