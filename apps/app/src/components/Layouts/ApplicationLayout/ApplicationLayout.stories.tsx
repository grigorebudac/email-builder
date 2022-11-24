import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ApplicationLayout from './ApplicationLayout';

export default {
  title: 'Layouts/ApplicationLayout',
  component: ApplicationLayout,
} as ComponentMeta<typeof ApplicationLayout>;

export const Default: ComponentStory<typeof ApplicationLayout> = () => (
  <ApplicationLayout title="Title">
    <h1>Content</h1>
  </ApplicationLayout>
);
