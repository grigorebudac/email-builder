import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Divider, Flex, Stack, theme } from '@lego/klik-ui';
import { EmailUnread, Lock } from '@lego/klik-ui/icons';
import { Auth } from '@/modules/authentication/types/auth.types';
import { TextFieldController } from '@/components/Controllers/TextFieldController';
import { Text } from '@lego/klik-ui';
import { ReactComponent as Microsoft } from '@/assets/svg/microsoft.svg';

type RegisterFormProps = {
  error: string;
  onSubmit: (credentials: Auth.LoginRequestPayload) => void;
  onMicrosoftSignIn: () => void;
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
    <Box width={['auto', '500px']}>
      <Button
        isFullWidth
        mt={5}
        variant="outline"
        color={theme.colors.slate[900]}
        borderColor={theme.colors.slate[100]}
        borderWidth="1px"
        leftIcon={
          <Microsoft style={{ width: 20, height: 20, marginRight: 10 }} />
        }
        onClick={props.onMicrosoftSignIn}
      >
        Login with Microsoft
      </Button>

      <Box position="relative" padding="0px 40px" margin="30px 0px">
        <Divider
          height="1px"
          backgroundColor={theme.colors.slate[100]}
          borderWidth="0px"
        />
        <Flex
          backgroundColor={theme.colors.white}
          position="absolute"
          left="50%"
          width="60px"
          justifyContent="center"
          style={{ transform: `translate(-30px, -50%)` }}
        >
          <Text fontSize="14px">Or</Text>
        </Flex>
      </Box>

      <form onSubmit={handleSubmit(props.onSubmit)}>
        <Stack margin="0" padding="0">
          <TextFieldController
            data-cy="register-email"
            placeholder="Enter your e-mail"
            name="email"
            isRequired
            error={errors?.email}
            control={control}
            borderWidth="1px"
            icon={<EmailUnread color="slate.400" fontSize="1.3rem" />}
          />

          <Box paddingTop={['5px', '10px']}>
            <TextFieldController
              data-cy="register-password"
              name="password"
              placeholder="Create password"
              type="password"
              isRequired
              icon={<Lock color="slate.400" fontSize="1.375rem" />}
              error={errors?.email}
              control={control}
              borderWidth="1px"
            />
          </Box>

          <Box paddingTop={['5px', '10px']}>
            <TextFieldController
              data-cy="register-confirmPassword"
              name="confirmPassword"
              placeholder="Repeat password"
              type="password"
              isRequired
              icon={<Lock color="slate.400" fontSize="1.375rem" />}
              error={errors?.email}
              control={control}
              borderWidth="1px"
            />
          </Box>

          <Text color="error.500">{props.error}</Text>
        </Stack>

        <Button
          mt={7}
          isFullWidth
          data-cy="register-submit"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          backgroundColor={theme.colors.slate[900]}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export { RegisterForm };
