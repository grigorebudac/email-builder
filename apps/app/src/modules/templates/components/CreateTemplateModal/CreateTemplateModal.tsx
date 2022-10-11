import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Input } from '@lego/klik-ui';

import SimpleModal from '@/components/Modals/SimpleModal';
import { Template } from '@/types/template.types';

interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Template.CreateTemplate) => Promise<void>;
}

const CreateTemplateModal = (props: CreateTemplateModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<Template.CreateTemplate>({
    defaultValues: {
      title: '',
      subtitle: '',
    },
  });

  return (
    <SimpleModal
      title="Create Template"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <Box mb="1rem">
          <Input
            {...register('title', { required: true })}
            placeholder="Title"
            isInvalid={errors.title != null}
          />
        </Box>

        <Box mb="1rem">
          <Input
            {...register('subtitle', { required: true })}
            placeholder="Description"
            isInvalid={errors.subtitle != null}
          />
        </Box>

        <Button type="submit" size="sm" isLoading={isSubmitting}>
          Create
        </Button>
      </form>
    </SimpleModal>
  );
};

export default CreateTemplateModal;
