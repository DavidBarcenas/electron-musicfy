import React from 'react';
import { Icon, Modal } from 'semantic-ui-react';

export const BasicModal = ({ show, setShow, title, children }) => {
  const handleClose = () => setShow(false);

  return (
    <Modal
      open={show}
      onClose={handleClose}
      className="basic-modal"
      size="tiny"
    >
      <Modal.Header>
        <h3>{title}</h3>
        <Icon name="close" onClick={handleClose} />
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};
