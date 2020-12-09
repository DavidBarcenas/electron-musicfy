import React, { useState } from 'react';
import { Button, Form, Icon, Input } from 'semantic-ui-react';

const initialState = {
  email: '',
  psswd: '',
};

export const LoginForm = ({ setSelectedForm }) => {
  const [showPsswd, setShowPsswd] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleShowPsswd = () => setShowPsswd(!showPsswd);

  const onChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const onSubmit = () => {
    console.log('Login...', formData);
  };

  return (
    <div className="login-form">
      <h1>Música para todos.</h1>

      <Form onSubmit={onSubmit} onChange={onChange} autoComplete="off">
        <Form.Field>
          <Input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            icon="mail outline"
          />
        </Form.Field>
        <Form.Field>
          <Input
            type={showPsswd ? 'text' : 'password'}
            name="psswd"
            placeholder="Contraseña"
            icon={
              showPsswd ? (
                <Icon name="eye slash outline" link onClick={handleShowPsswd} />
              ) : (
                <Icon name="eye" link onClick={handleShowPsswd} />
              )
            }
          />
        </Form.Field>
        <Button type="submit">Iniciar Sesión</Button>
      </Form>
      <div className="login-form-options">
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>
          ¿No tienes cuenta?
          <span onClick={() => setSelectedForm('register')}>Registrarte</span>
        </p>
      </div>
    </div>
  );
};
