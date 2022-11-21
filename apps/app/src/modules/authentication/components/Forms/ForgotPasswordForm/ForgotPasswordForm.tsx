import React from 'react';
import { Button } from '@lego/klik-ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Auth } from '@/modules/authentication/types/auth.types';
import { TextFieldController } from '@/components/Controllers/TextFieldController';

export type ForgotPasswordFormProps = {
  onSubmit: (credentials: Auth.ForgotPassword) => void;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<Auth.ForgotPassword>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <TextFieldController
        name="email"
        type="email"
        placeholder="Your Email"
        error={errors?.email}
        control={control}
      />

      <Button
        mt="1.6rem"
        type="submit"
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        Reset Password
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
