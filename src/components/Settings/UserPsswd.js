import React, { useState } from 'react';
import { Button, Form, Icon, Input } from 'semantic-ui-react';

export const UserPsswd = ({ setShowModal, setTitleModal, setContentModal }) => {
  const onEdit = () => {
    setTitleModal('Actualizar contraseña');
    setContentModal(<ChangePsswdForm />);
    setShowModal(true);
  };

  return (
    <div className="user-psswd">
      <h3>Contraseña: *** *** *** ***</h3>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
};

const initShowPsswd = {
  prev: false,
  current: false,
  repeat: false,
};

function ChangePsswdForm() {
  const [loading, setloading] = useState(false);
  const [showPsswd, setShowPsswd] = useState(initShowPsswd);

  const handleShowPsswd = (field) => {
    setShowPsswd({ ...initShowPsswd, [field]: !showPsswd[field] });
  };

  const onSubmit = () => {
    console.log('enviando form');
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          type={showPsswd.prev ? 'text' : 'password'}
          placeholder="Contraseña actual"
          icon={
            <Icon
              name={showPsswd.prev ? 'eye slash outline' : 'eye'}
              link
              onClick={() => handleShowPsswd('prev')}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          type={showPsswd.current ? 'text' : 'password'}
          placeholder="Nueva contraseña"
          icon={
            <Icon
              name={showPsswd.current ? 'eye slash outline' : 'eye'}
              link
              onClick={() => handleShowPsswd('current')}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          type={showPsswd.repeat ? 'text' : 'password'}
          placeholder="Repetir nueva contraseña"
          icon={
            <Icon
              name={showPsswd.repeat ? 'eye slash outline' : 'eye'}
              link
              onClick={() => handleShowPsswd('repeat')}
            />
          }
        />
      </Form.Field>
      <Button type="submit" loading={loading}>
        Actualizar contraseña
      </Button>
    </Form>
  );
}
