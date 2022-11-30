import React from 'react';
import { Box, Button, theme } from '@lego/klik-ui';
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
    <Box width={['auto', '500px']} mt={5}>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <TextFieldController
          name="email"
          type="email"
          placeholder="Your Email"
          error={errors?.email}
          control={control}
          borderWidth="1px"
        />

        <Button
          mt={7}
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          isFullWidth
          backgroundColor={theme.colors.slate[900]}
        >
          Reset Password
        </Button>
      </form>
    </Box>
  );
};

export default ForgotPasswordForm;
