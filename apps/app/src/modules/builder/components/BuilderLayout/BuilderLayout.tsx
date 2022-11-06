import React from 'react';
import { Box, Button, IconButton, Navbar, useDisclosure } from '@lego/klik-ui';
import { ReactComponent as ArrowBackIcon } from '@/assets/svg/arrow-back-outline.svg';
import Link from 'next/link';
import { IEmailTemplate } from 'easy-email-editor';
import useAsyncAction from '@/hooks/useAsyncAction';
import PreviewEmailModal from '../PreviewEmailModal';
import TestEmailModal from '../TestEmailModal';
import { Template } from '@/types/template.types';
import { Email } from '@/types/email.types';

interface BuilderLayoutProps {
  mergeTags: Template.MergeTags;
  onSendTestEmail: (
    values: Template.MergeTags
  ) => Promise<Email.SendEmailResponse>;
  onPreviewEmail: (values: Template.MergeTags) => void;
  onSave: () => Promise<IEmailTemplate>;
}

const BuilderLayout = (props: React.PropsWithChildren<BuilderLayoutProps>) => {
  const { isLoading, onTriggerAction } = useAsyncAction();
  const {
    isOpen: isOpenPreiew,
    onOpen: onOpenPreview,
    onClose: onClosePreview,
  } = useDisclosure();
  const {
    isOpen: isOpenSend,
    onOpen: onOpenSend,
    onClose: onCloseSend,
  } = useDisclosure();

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
          <Button marginRight={4} variant="ghost" onClick={onOpenSend}>
            Send test email
          </Button>

          <Button marginRight={4} variant="ghost" onClick={onOpenPreview}>
            Preview email
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

      {isOpenPreiew && (
        <PreviewEmailModal
          isOpen={isOpenPreiew}
          mergeTags={props.mergeTags}
          onClose={onClosePreview}
          onSubmit={props.onPreviewEmail}
        />
      )}

      {isOpenSend && (
        <TestEmailModal
          isOpen={isOpenSend}
          mergeTags={props.mergeTags}
          onClose={onCloseSend}
          onSubmit={props.onSendTestEmail}
        />
      )}
    </Box>
  );
};

export default BuilderLayout;
