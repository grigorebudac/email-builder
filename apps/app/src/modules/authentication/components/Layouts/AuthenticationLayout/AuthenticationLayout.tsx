import React, { useMemo } from 'react';
import { Box, Button, Container, Divider, Tabs } from '@lego/klik-ui';
import { InitialAuthSection } from '../../../types/auth.types';

type AuthenticationLayoutProps = {
  loginSection: React.ReactNode;
  registerSection: React.ReactNode;
  initial: InitialAuthSection;
  onLoginWithMicrosoft: () => void;
};

const AuthenticationLayout: React.FC<AuthenticationLayoutProps> = ({
  loginSection,
  registerSection,
  initial,
  onLoginWithMicrosoft,
}) => {
  const oauthSection = useMemo(() => {
    return (
      <Box mt={5}>
        <Divider />

        <Button isFullWidth mt={5} onClick={onLoginWithMicrosoft}>
          Login with Microsoft
        </Button>
      </Box>
    );
  }, [onLoginWithMicrosoft]);

  return (
    <Container height="100vh" display="grid" placeItems="center">
      <Tabs isFitted={true} width="100%" height="400" defaultIndex={initial}>
        <Tabs.TabList>
          <Tabs.Tab>Log in</Tabs.Tab>
          <Tabs.Tab>Register</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanels>
          <Tabs.TabPanel>
            {loginSection}
            {oauthSection}
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            {registerSection}
            {oauthSection}
          </Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs>
    </Container>
  );
};

export { AuthenticationLayout };
