import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Flex, Stack, theme } from '@lego/klik-ui';
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
    <Box width={['auto', '500px']}>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <Stack>
          <TextFieldController
            data-cy="login-email"
            name="email"
            placeholder="Enter your e-mail"
            isRequired
            error={errors?.email}
            control={control}
          />

          <Box paddingTop={['5px', '10px']}>
            <TextFieldController
              data-cy="login-password"
              name="password"
              placeholder="Password"
              type="password"
              isRequired
              icon={<Lock color="slate.400" fontSize="1.375rem" />}
              error={errors?.password}
              control={control}
            />
          </Box>

          <Text color="error.500">{props.error}</Text>
        </Stack>

        <Button
          isFullWidth
          data-cy="login-submit"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          backgroundColor={theme.colors.slate[900]}
          mt={7}
        >
          Log In
        </Button>

        <Flex justifyContent="space-between" paddingTop={['5px', '10px']}>
          <Text fontSize={['10px', '14px']}>
            Not registered yet?
            <Link href="/forgot-password" passHref>
              <a>
                <Text
                  fontWeight="semibold"
                  marginLeft="5px"
                  textDecoration="underline"
                  as="span"
                >
                  Create account
                </Text>
              </a>
            </Link>
          </Text>

          <Link href="/forgot-password" passHref>
            <a>
              <Text
                fontWeight="semibold"
                fontSize={['10px', '14px']}
                textDecoration="underline"
              >
                Forgot your password?
              </Text>
            </a>
          </Link>
        </Flex>
      </form>
    </Box>
  );
};

export { LoginForm };
