import React from 'react';
import { Box, Button, IconButton, Navbar } from '@lego/klik-ui';
import { ReactComponent as ArrowBackIcon } from '@/assets/svg/arrow-back-outline.svg';
import Link from 'next/link';
import { IEmailTemplate } from 'easy-email-editor';
import useAsyncAction from '@/hooks/useAsyncAction';

interface BuilderLayoutProps {
  onSave: () => Promise<IEmailTemplate>;
}

const BuilderLayout = (props: React.PropsWithChildren<BuilderLayoutProps>) => {
  const { isLoading, onTriggerAction } = useAsyncAction();

  function handleSave() {
    onTriggerAction(props.onSave);
  }

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
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            onClick={handleSave}
          >
            Save
          </Button>
        </Navbar.Segment>
      </Navbar>

      <Box width="100%" height="100%">
        {props.children}
      </Box>
    </Box>
  );
};

export default BuilderLayout;
