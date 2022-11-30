import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Divider, Flex, Stack, theme } from '@lego/klik-ui';
import { EmailUnread, Lock } from '@lego/klik-ui/icons';
import { Auth } from '@/modules/authentication/types/auth.types';
import { TextFieldController } from '@/components/Controllers/TextFieldController';
import { Text } from '@lego/klik-ui';
import Link from 'next/link';
import { ReactComponent as Microsoft } from '@/assets/svg/microsoft.svg';

type LoginFormProps = {
  error: string;
  onSubmit: (credentials: Auth.LoginRequestPayload) => void;
  onMicrosoftSignIn: () => void;
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
      <Button
        isFullWidth
        mt={5}
        variant="outline"
        color={theme.colors.slate[900]}
        borderColor={theme.colors.slate[100]}
        borderWidth="1px"
        leftIcon={<Microsoft className="microsoft" />}
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
          className="interLabel"
        >
          <Text fontSize="14px">Or</Text>
        </Flex>
      </Box>

      <form onSubmit={handleSubmit(props.onSubmit)}>
        <Stack margin="0" padding="0">
          <TextFieldController
            data-cy="login-email"
            name="email"
            placeholder="Enter your e-mail"
            isRequired
            error={errors?.email}
            control={control}
            borderWidth="1px"
            icon={<EmailUnread color="slate.400" fontSize="1.3rem" />}
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
              borderWidth="1px"
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
            <Link href="/register" passHref>
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
