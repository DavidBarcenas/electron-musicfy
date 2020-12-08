import React, { useState } from 'react';
import { Button, Form, Icon, Input } from 'semantic-ui-react';
import firebase from '../../utils/firebase';
import 'firebase/auth';

const initialStateForm = {
  username: '',
  psswd: '',
  email: '',
};

export const RegisterForm = ({ setSelectedForm }) => {
  const [formData, setFormData] = useState(initialStateForm);
  const [showPsswd, setShowPsswd] = useState(false);

  const handleShowPsswd = () => setShowPsswd(!showPsswd);

  const onChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const onSubmit = () => {
    console.log('Formulario enviado:', formData);
  };

  return (
    <div className="register-form">
      <h1>Empieza a escuchar con una cuenta de Musicfy gratis.</h1>
      <Form onSubmit={onSubmit} onChange={onChange} autoComplete="false">
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
