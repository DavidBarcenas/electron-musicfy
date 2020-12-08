import React from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import firebase from '../../utils/firebase';
import 'firebase/auth';

export const RegisterForm = ({ setSelectedForm }) => {
  const onSubmit = () => {
    console.log('Formulario enviado');
  };

  return (
    <div className="register-form">
      <h1>Empieza a escuchar con una cuenta de Musicfy gratis.</h1>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="¿Cómo deberíamos llamarte?"
            icon="user circle outline"
          />
        </Form.Field>
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
        <Button type="submit">Continuar</Button>
      </Form>
      <div className="register-form-options">
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>
          ¿Ya tienes Musicfy?
          <span onClick={() => setSelectedForm('login')}>Iniciar sesión</span>
        </p>
      </div>
    </div>
  );
};
