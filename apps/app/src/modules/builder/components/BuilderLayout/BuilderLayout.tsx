import React from 'react';
import { Box, Button, IconButton, Navbar, useDisclosure } from '@lego/klik-ui';
import { ReactComponent as ArrowBackIcon } from '@/assets/svg/arrow-back-outline.svg';
import Link from 'next/link';
import { IEmailTemplate } from 'easy-email-editor';
import useAsyncAction from '@/hooks/useAsyncAction';
import TestEmailModal from '../TestEmailModal';
import { Template } from '@/types/template.types';

interface BuilderLayoutProps {
  mergeTags: Template.MergeTags;
  onSendTestEmail: (values: Template.MergeTags) => void;
  onSave: () => Promise<IEmailTemplate>;
}

const BuilderLayout = (props: React.PropsWithChildren<BuilderLayoutProps>) => {
  const { isLoading, onTriggerAction } = useAsyncAction();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Button marginRight={4} variant="ghost" onClick={onOpen}>
            Send test email
          </Button>

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

      {isOpen && (
        <TestEmailModal
          isOpen={isOpen}
          mergeTags={props.mergeTags}
          onClose={onClose}
          onSubmit={props.onSendTestEmail}
        />
      )}
    </Box>
  );
};

export default BuilderLayout;
