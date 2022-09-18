import React from 'react';
import { EmailEditor, EmailEditorProvider } from 'easy-email-editor';
import { StandardLayout } from 'easy-email-extensions';
import { useWindowSize } from 'react-use';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';
import '@arco-themes/react-easy-email-theme/css/arco.css';

import {
  BuilderContextProvider,
  BuilderContext,
} from '../../contexts/BuilderContext';

const Builder = () => {
  const { width } = useWindowSize();

  const smallScene = width < 1400;

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
                  <StandardLayout compact={!smallScene} showSourceCode={true}>
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
