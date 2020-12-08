import React, { useState } from 'react';
import { LoginForm } from '../components/Auth/LoginForm';
import { RegisterForm } from '../components/Auth/RegisterForm';
import { AuthOptions } from '../components/Auth/AuthOptions';

export const Auth = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  const handleForm = () => {
    switch (selectedForm) {
      case 'login':
        return <LoginForm />;
      case 'register':
        return <RegisterForm />;

      default:
        return <AuthOptions />;
    }
  };

  return <div className="auth"></div>;
};
