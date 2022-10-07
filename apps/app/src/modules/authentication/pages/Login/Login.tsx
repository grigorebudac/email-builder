import React, { useState } from 'react';
import {
  FormControl,
  Input,
  Container,
  Tabs,
  Stack,
  Button,
} from '@lego/klik-ui';
import { Lock } from '@lego/klik-ui/icons';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../../redux/endpoints/authentication.endpoints';
import { useRouter } from 'next/router';

const Login = () => {
  const [error, setError] = useState('');
  const [logInCall] = useLoginMutation();
  const [registerCall] = useRegisterMutation();
  const router = useRouter();

  const testCredentials = { email: 'test@gmail.com', password: 'pass1' };

  async function handleSignIn(credentials: any) {
    try {
      await logInCall(testCredentials)
        .unwrap()
        .then((res) => {
          console.log({ res });
        })
        .catch((error) => console.error({ error }));
    } catch (error) {
      error instanceof Error ? setError(error.message) : setError('');
    }
  }

  async function handleRegister(credentials: any) {
    try {
      await registerCall(testCredentials)
        .unwrap()
        .then((res) => {
          console.log({ res });
        })
        .catch((error) => console.error({ error }));
    } catch (error) {
      error instanceof Error ? setError(error.message) : setError('');
    }
  }

  return (
    <Container height={'100vh'} display={'grid'} placeItems={'center'}>
      <Tabs isFitted={true} width={'100%'}>
        <Tabs.TabList>
          <Tabs.Tab>Log in</Tabs.Tab>
          <Tabs.Tab>Register</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanels>
          <Tabs.TabPanel>
            <Stack>
              <FormControl isRequired={true}>
                <FormControl.Label>Email</FormControl.Label>
                <Input.Group>
                  <Input required={true} />
                </Input.Group>
              </FormControl>

              <FormControl isRequired={true}>
                <FormControl.Label>Password</FormControl.Label>
                <Input.Group>
                  <Input.LeftElement pointerEvents="none">
                    <Lock color="slate.400" fontSize="1.375rem" />
                  </Input.LeftElement>
                  <Input required={true} type={'password'} />
                </Input.Group>
              </FormControl>
            </Stack>
            <Button
              type={'button'}
              float={'right'}
              mt={5}
              onClick={handleSignIn}
            >
              Submit
            </Button>
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            <Stack>
              <FormControl isRequired={true}>
                <FormControl.Label>Email</FormControl.Label>
                <Input.Group>
                  <Input required={true} />
                </Input.Group>
              </FormControl>

              <FormControl isRequired={true}>
                <FormControl.Label>Password</FormControl.Label>
                <Input.Group>
                  <Input.LeftElement pointerEvents="none">
                    <Lock color="slate.400" fontSize="1.375rem" />
                  </Input.LeftElement>
                  <Input required={true} type={'password'} />
                </Input.Group>
              </FormControl>

              <FormControl isRequired={true}>
                <FormControl.Label>Password (again)</FormControl.Label>
                <Input.Group>
                  <Input.LeftElement pointerEvents="none">
                    <Lock color="slate.400" fontSize="1.375rem" />
                  </Input.LeftElement>
                  <Input required={true} type={'password'} />
                </Input.Group>
              </FormControl>
            </Stack>
            <Button
              type={'button'}
              float={'right'}
              mt={5}
              onClick={handleRegister}
            >
              Create account
            </Button>
          </Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs>
    </Container>
  );
};

export default Login;
