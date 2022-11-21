import React from 'react';
import { Button, Box } from '@lego/klik-ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Auth } from '@/modules/authentication/types/auth.types';
import { TextFieldController } from '@/components/Controllers/TextFieldController';

type ResetPasswordFormValues = Pick<Auth.ResetPassword, 'password'> & {
  confirmPassword: string;
};

export type ResetPasswordFormProps = {
  onSubmit: (credentials: ResetPasswordFormValues) => void;
};

const schema = yup.object().shape({
  password: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], undefined)
    .required(),
});

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <TextFieldController
        name="password"
        type="password"
        placeholder="Your New Password"
        error={errors?.password}
        control={control}
      />

      <Box mt="1.6rem">
        <TextFieldController
          name="confirmPassword"
          type="password"
          placeholder="Your New Password Again"
          error={errors?.confirmPassword}
          control={control}
        />
      </Box>

      <Button
        mt="1.6rem"
        type="submit"
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
