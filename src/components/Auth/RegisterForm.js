import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Icon, Input } from 'semantic-ui-react';
import { validateEmail } from '../../utils/validations';
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
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);

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

    if (!formData.username) {
      errors.username = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.psswd)
        .then(() => {
          changeUserName();
          sendVerificationEmail();
        })
        .catch(() => {
          toast.error('Error al crear la cuenta');
        })
        .finally(() => {
          setLoading(false);
          setSelectedForm(null);
        });
    }
  };

  const changeUserName = () => {
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: formData.username,
      })
      .catch(() => {
        toast.error('Error al asignar el nombre de usuario.');
      });
  };

  const sendVerificationEmail = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        toast.success('Se ha enviado un email de verificación.');
      })
      .catch(() => {
        toast.error('Error al enviar el email de verificación.');
      });
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
            error={formError.username}
          />
          {formError.username && (
            <span className="error-text">
              Por favor, introduce un nombre de usuario.
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            icon="mail outline"
            error={formError.email}
          />
          {formError.username && (
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
            error={formError.psswd}
            icon={
              showPsswd ? (
                <Icon name="eye slash outline" link onClick={handleShowPsswd} />
              ) : (
                <Icon name="eye" link onClick={handleShowPsswd} />
              )
            }
          />
          {formError.username && (
            <span className="error-text">
              La contraseña debe ser mayor a 5 caracteres.
            </span>
          )}
        </Form.Field>
        <Button type="submit" loading={loading}>
          Continuar
        </Button>
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
