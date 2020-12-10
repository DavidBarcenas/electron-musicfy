import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Icon, Input } from 'semantic-ui-react';
import { validateEmail } from '../../utils/validations';
import firebase from '../../utils/firebase';
import 'firebase/auth';

const initialState = {
  email: '',
  psswd: '',
};

export const LoginForm = ({ setSelectedForm }) => {
  const [showPsswd, setShowPsswd] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const [userActive, setUserActive] = useState(true);
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
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.psswd)
        .then((resp) => {
          setUser(resp.user);
          setUserActive(resp.user.emailVerified);

          if (!resp.user.emailVerified) {
            toast.warning('Tienes que verificar tu correo electrónico.');
          }
        })
        .catch((err) => handleError(err.code))
        .finally(() => {
          setLoading(false);
        });
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
        <Button type="submit" loading={loading}>
          Iniciar Sesión
        </Button>
      </Form>

      {!userActive && (
        <ButtonResetSEmailVerification
          user={user}
          setLoading={setLoading}
          setUserActive={setUserActive}
        />
      )}

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

function ButtonResetSEmailVerification({ user, setLoading, setUserActive }) {
  const resendVerificationEmail = () => {
    user
      .sendEmailVerification()
      .then(() => {
        toast.success('Se ha enviado el email de verificación.');
      })
      .catch((error) => {
        handleError(error.code);
      })
      .finally(() => {
        setLoading(false);
        setUserActive(true);
      });
  };

  return (
    <div className="resend-verification-email">
      <p>
        Si no has recibido el email de verificación da{' '}
        <span onClick={resendVerificationEmail}>click aquí</span>
      </p>
    </div>
  );
}

function handleError(code) {
  switch (code) {
    case 'auth/user-not-found':
      toast.warning('El usuario o la contraseña son incorrectos');
      break;
    case 'auth/wrong-password':
      toast.warning('El usuario o la contraseña son incorrectos');
      break;
    case 'auth/too-many-requests':
      toast.warning(
        'Hes enviado demasiadas solicitudes de verificación de email'
      );
      break;
    default:
      // nothing
      break;
  }
}
