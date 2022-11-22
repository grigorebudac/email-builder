import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Stack } from '@lego/klik-ui';
import { Lock } from '@lego/klik-ui/icons';
import { Auth } from '@/modules/authentication/types/auth.types';
import { TextFieldController } from '@/components/Controllers/TextFieldController';
import { Text } from '@lego/klik-ui';
import Link from 'next/link';

type LoginFormProps = {
  onSubmit: (credentials: Auth.LoginRequestPayload) => void;
  error: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required('this field is required'),
  password: yup.string().min(8).required('this field is required'),
});

const LoginForm = (props: LoginFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<Auth.LoginRequestPayload>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <Stack>
        <TextFieldController
          data-cy="login-email"
          name="email"
          label="Email"
          isRequired
          error={errors?.email}
          control={control}
        />

        <TextFieldController
          data-cy="login-password"
          name="password"
          label="Password"
          type="password"
          isRequired
          icon={<Lock color="slate.400" fontSize="1.375rem" />}
          error={errors?.password}
          control={control}
        />

        <Box mt={5}>
          <Link href="/forgot-password" passHref>
            <a>Forgot your password?</a>
          </Link>
        </Box>

        <Text color="error.500">{props.error}</Text>
      </Stack>

      <Box mt={5}>
        <Button
          data-cy="submit-login"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export { LoginForm };
