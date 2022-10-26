import React from 'react';
import { Container, Tabs } from '@lego/klik-ui';
import { InitialAuthSection } from '../../../types/auth.types';

type AuthenticationLayoutProps = {
  loginSection: React.ReactNode;
  registerSection: React.ReactNode;
  initial: InitialAuthSection;
};

const AuthenticationLayout: React.FC<AuthenticationLayoutProps> = ({
  loginSection,
  registerSection,
  initial,
}) => {
  return (
    <Container height="100vh" display="grid" placeItems="center">
      <Tabs isFitted={true} width="100%" height="400" defaultIndex={initial}>
        <Tabs.TabList>
          <Tabs.Tab>Log in</Tabs.Tab>
          <Tabs.Tab>Register</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanels>
          <Tabs.TabPanel>{loginSection}</Tabs.TabPanel>
          <Tabs.TabPanel>{registerSection}</Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs>
    </Container>
  );
};

export { AuthenticationLayout };
