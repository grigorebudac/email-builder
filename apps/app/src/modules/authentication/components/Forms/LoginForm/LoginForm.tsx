import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Stack } from '@lego/klik-ui';
import { Lock } from '@lego/klik-ui/icons';
import { Auth } from '@/modules/authentication/types/auth.types';
import { TextFieldController } from '@/modules/authentication/controllers/TextFieldController';

type LoginFormProps = {
  onSubmit: (credentials: Auth.LoginRequestPayload) => void;
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
      </Stack>
      <Button float="right" mt={5} type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};

export { LoginForm };
