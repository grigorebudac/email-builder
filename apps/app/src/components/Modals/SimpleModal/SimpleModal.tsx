import React from 'react';
import { Modal } from '@lego/klik-ui';

interface SimpleModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

const SimpleModal = (props: React.PropsWithChildren<SimpleModalProps>) => {
  if (!props.isOpen) {
    return null;
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <Modal.Overlay />

      <Modal.Content>
        <Modal.CloseButton />
        {props.title && (
          <Modal.Header fontSize="xl">{props.title}</Modal.Header>
        )}

        <Modal.Body>{props.children}</Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default SimpleModal;
