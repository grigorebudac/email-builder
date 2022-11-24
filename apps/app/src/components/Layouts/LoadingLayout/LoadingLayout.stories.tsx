import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoadingLayout from './LoadingLayout';

export default {
  title: 'Layouts/LoadingLayout',
  component: LoadingLayout,
} as ComponentMeta<typeof LoadingLayout>;

export const Default: ComponentStory<typeof LoadingLayout> = () => (
  <LoadingLayout />
);
