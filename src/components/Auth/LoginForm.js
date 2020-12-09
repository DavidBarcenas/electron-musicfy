import React, { useState } from 'react';
import { Button, Form, Icon, Input } from 'semantic-ui-react';
import { validateEmail } from '../../utils/validations';

const initialState = {
  email: '',
  psswd: '',
};

export const LoginForm = ({ setSelectedForm }) => {
  const [showPsswd, setShowPsswd] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const [userActive, setUserActive] = useState(false);
  const [user, setUser] = useState(null);

  const handleShowPsswd = () => setShowPsswd(!showPsswd);

  const onChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const onSubmit = () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }
    if (formData.psswd.length < 6) {
      errors.psswd = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log('login correcto');
    }
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
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
              Por favor, introduce un correo electrónico válido.
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPsswd ? 'text' : 'password'}
            name="psswd"
            placeholder="Contraseña"
            error={formError.email}
            icon={
              showPsswd ? (
                <Icon name="eye slash outline" link onClick={handleShowPsswd} />
              ) : (
                <Icon name="eye" link onClick={handleShowPsswd} />
              )
            }
          />
          {formError.psswd && (
            <span className="error-text">
              Por favor, introduce una contraseña válida.
            </span>
          )}
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
