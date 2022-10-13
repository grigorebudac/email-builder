import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Input } from '@lego/klik-ui';

import SimpleModal from '@/components/Modals/SimpleModal';
import { Template } from '@/types/template.types';
import { flatten } from '../../utils/flatten';

interface TestEmailModalProps {
  isOpen: boolean;
  mergeTags: Template.MergeTags;
  onClose: () => void;
  onSubmit: (data: Template.MergeTags) => void;
}

const TestEmailModal = (props: TestEmailModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<Template.MergeTags>({
    defaultValues: props.mergeTags,
  });

  function handleTriggerSubmit(data: Template.MergeTags) {
    props.onSubmit(data);
    props.onClose();
  }

  const flattenedMergeTags = useMemo(() => {
    return flatten(props.mergeTags, {}, [], (acc, branch, key, val) => ({
      ...acc,
      [branch.concat(key).join('.')]: val,
    }));
  }, [props.mergeTags]);

  return (
    <SimpleModal
      title="Send Test Email"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <form onSubmit={handleSubmit(handleTriggerSubmit)}>
        {Object.entries(flattenedMergeTags).map(([tagName, tagValue]) => (
          <Box key={tagName} mb="1rem">
            <Input
              {...register(tagName)}
              placeholder={tagName}
              isInvalid={errors.title != null}
            />
          </Box>
        ))}

        <Button type="submit" size="sm" isLoading={isSubmitting}>
          Send Email
        </Button>
      </form>
    </SimpleModal>
  );
};

export default TestEmailModal;
