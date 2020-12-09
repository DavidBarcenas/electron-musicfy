import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

export const LoginForm = ({ setSelectedForm }) => {
  const [state, setstate] = useState(null);

  const onSubmit = () => {
    console.log('Login...');
  };

  return (
    <div className="login-form">
      <h1>Música para todos.</h1>

      <Form onSubmit={onSubmit}>
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
            type="password"
            name="psswd"
            placeholder="Contraseña"
            icon="eye"
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
