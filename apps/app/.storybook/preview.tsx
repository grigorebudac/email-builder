import React from 'react';
import AppContainer from '../src/containers/AppContainer';

export const decorators = [
  (Story) => (
    <AppContainer>
      <Story />
    </AppContainer>
  ),
];
