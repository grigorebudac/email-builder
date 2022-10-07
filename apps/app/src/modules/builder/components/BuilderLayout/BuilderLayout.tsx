import { Box, Button, Navbar } from '@lego/klik-ui';
import React from 'react';

interface BuilderLayoutProps {
  onSave: () => void;
}

const BuilderLayout = (props: React.PropsWithChildren<BuilderLayoutProps>) => {
  return (
    <Box>
      <Navbar isSecondary={true}>
        <Navbar.Segment ml="auto">
          <Button onClick={props.onSave}>Save</Button>
        </Navbar.Segment>
      </Navbar>

      <Box width="100%" height="100%">
        {props.children}
      </Box>
    </Box>
  );
};

export default BuilderLayout;
