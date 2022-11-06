import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Input, Divider, Text } from '@lego/klik-ui';
import * as yup from 'yup';
import SimpleModal from '@/components/Modals/SimpleModal';
import { Template } from '@/types/template.types';
import { flatten } from '../../utils/flatten';
import { TextFieldController } from '@/components/Controllers/TextFieldController';
import { yupResolver } from '@hookform/resolvers/yup';
import { Email } from '@/types/email.types';

interface TestEmailModalProps {
  isOpen: boolean;
  mergeTags: Template.MergeTags;
  onClose: () => void;
  onSubmit: (values: Template.MergeTags) => Promise<Email.SendEmailResponse>;
}

const schema = yup.object().shape({
  to: yup.string().email().required('this field is required'),
  subject: yup.string().required('this field is required'),
});

const TestEmailModal = (props: TestEmailModalProps) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting, errors },
  } = useForm<Template.MergeTags>({
    resolver: yupResolver(schema),
    defaultValues: {
      to: 'andy27hush@gmail.com',
      subject: 'TestSubj',
      ...props.mergeTags,
    },
  });

  const [error, setError] = useState('');

  async function handleTriggerSubmit(data: Template.MergeTags) {
    try {
      await props.onSubmit(data);
      props.onClose();
    } catch (error) {
      setError(error.data.error);
    }
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
      <Box mb="1rem">
        <TextFieldController
          name="to"
          label="To"
          placeholder="andy27hush@gmail.com"
          isRequired
          error={errors?.to}
          control={control}
        />
      </Box>

      <Box mb="1rem">
        <TextFieldController
          name="subject"
          label="Subject"
          placeholder="subject"
          isRequired
          error={errors?.subject}
          control={control}
        />
      </Box>

      <Divider mb={'1rem'} />
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

        <Text fontSize="0.8rem" color="error.400">
          {error}
        </Text>
        <Button type="submit" size="md" float="right" isLoading={isSubmitting}>
          Send
        </Button>
      </form>
    </SimpleModal>
  );
};

export default TestEmailModal;
