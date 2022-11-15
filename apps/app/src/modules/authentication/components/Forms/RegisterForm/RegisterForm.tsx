import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Stack } from '@lego/klik-ui';
import { Lock } from '@lego/klik-ui/icons';
import { Auth } from '@/modules/authentication/types/auth.types';
import { TextFieldController } from '@/components/Controllers/TextFieldController';
import { Text } from '@lego/klik-ui';

type RegisterFormProps = {
  onSubmit: (credentials: Auth.RegisterRequestPayload) => void;
  error: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required('this field is required'),
  password: yup.string().min(8).required('this field is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "passwords don't match!")
    .required('Required'),
});

const RegisterForm = (props: RegisterFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<Auth.RegisterRequestPayload>({
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
          name="email"
          label="Email"
          isRequired
          error={errors?.email}
          control={control}
        />

        <TextFieldController
          name="password"
          label="Password"
          type="password"
          isRequired
          icon={<Lock color="slate.400" fontSize="1.375rem" />}
          error={errors?.email}
          control={control}
        />

        <TextFieldController
          name="confirmPassword"
          label="Confirm password"
          type="password"
          isRequired
          icon={<Lock color="slate.400" fontSize="1.375rem" />}
          error={errors?.email}
          control={control}
        />

        <Text color="error.500">{props.error}</Text>
      </Stack>

      <Box mt={5}>
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Submit
        </Button>
      </Box>
    </form>
  );
};

export { RegisterForm };
