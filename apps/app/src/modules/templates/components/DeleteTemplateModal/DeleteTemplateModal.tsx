import React from 'react';
import { Button, ButtonGroup, Modal } from '@lego/klik-ui';

interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const CreateTemplateModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateTemplateModalProps) => {
  return (
    <Modal
      hideIcon={true}
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      variant="error"
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header fontSize="xl">
          Are you sure you want to delete this entry?
        </Modal.Header>
        <Modal.CloseButton />

        <Modal.Body fontSize="md">
          This action can&apos;t be undone! The selected template will be
          permanently deleted.
        </Modal.Body>

        <Modal.Footer>
          <ButtonGroup>
            <Button
              data-cy={`deleteTemplate-btn`}
              colorScheme="error"
              onClick={onSubmit}
            >
              Delete entry
            </Button>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default CreateTemplateModal;
