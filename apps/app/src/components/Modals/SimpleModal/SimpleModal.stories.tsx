import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SimpleModal from './SimpleModal';

export default {
  title: 'Modals/SimpleModal',
  component: SimpleModal,
} as ComponentMeta<typeof SimpleModal>;

export const Default: ComponentStory<typeof SimpleModal> = () => (
  <SimpleModal isOpen title="Title" onClose={() => null}>
    <h1>Content</h1>
  </SimpleModal>
);
