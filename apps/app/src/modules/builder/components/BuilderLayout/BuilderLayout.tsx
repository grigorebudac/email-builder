import React from 'react';
import { Box, Button, IconButton, Navbar } from '@lego/klik-ui';
import { ReactComponent as ArrowBackIcon } from '@/assets/svg/arrow-back-outline.svg';
import Link from 'next/link';

interface BuilderLayoutProps {
  onSave: () => void;
}

const BuilderLayout = (props: React.PropsWithChildren<BuilderLayoutProps>) => {
  return (
    <Box>
      <Navbar isSecondary={true}>
        <Navbar.Segment ml={4}>
          <Link href="/">
            <IconButton
              aria-label="back"
              size="sm"
              variant="ghost"
              icon={<ArrowBackIcon />}
            />
          </Link>
        </Navbar.Segment>

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
