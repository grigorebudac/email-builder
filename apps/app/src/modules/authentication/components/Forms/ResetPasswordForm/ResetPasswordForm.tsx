import React from 'react';
import { Button, Box, theme } from '@lego/klik-ui';
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
    <Box width={['auto', '500px']} mt={5}>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <TextFieldController
          name="password"
          type="password"
          placeholder="Your New Password"
          error={errors?.password}
          control={control}
          borderWidth="1px"
        />

        <Box paddingTop={['5px', '10px']}>
          <TextFieldController
            name="confirmPassword"
            type="password"
            placeholder="Repeat Your New Password"
            error={errors?.confirmPassword}
            control={control}
            borderWidth="1px"
          />
        </Box>

        <Button
          mt={7}
          isFullWidth
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          backgroundColor={theme.colors.slate[900]}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ResetPasswordForm;
