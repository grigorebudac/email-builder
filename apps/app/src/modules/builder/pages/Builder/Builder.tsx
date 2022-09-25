import React from 'react';
import { EmailEditor, EmailEditorProvider } from 'easy-email-editor';
import { StandardLayout } from 'easy-email-extensions';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';
import '@arco-themes/react-easy-email-theme/css/arco.css';

import {
  BuilderContextProvider,
  BuilderContext,
} from '../../contexts/BuilderContext';
import { useMediaQuery } from '@chakra-ui/media-query';

const Builder = () => {
  const [isSmallScene] = useMediaQuery('(max-width: 1280px)');

  return (
    <BuilderContextProvider>
      <BuilderContext.Consumer>
        {({ initialValues }) => (
          <EmailEditorProvider
            data={initialValues}
            height={'calc(100vh - 72px)'}
            autoComplete
            dashed={false}
          >
            {({ values }) => {
              return (
                <>
                  {/* @ts-ignore */}
                  <StandardLayout compact={!isSmallScene} showSourceCode={true}>
                    <EmailEditor />
                  </StandardLayout>
                </>
              );
            }}
          </EmailEditorProvider>
        )}
      </BuilderContext.Consumer>
    </BuilderContextProvider>
  );
};

export default Builder;
