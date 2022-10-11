import React from 'react';
import { EmailEditor, EmailEditorProvider } from 'easy-email-editor';
import { StandardLayout } from 'easy-email-extensions';
import { useMediaQuery } from '@chakra-ui/media-query';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';
import '@arco-themes/react-easy-email-theme/css/arco.css';

import {
  BuilderContextProvider,
  BuilderContext,
} from '../../contexts/BuilderContext';
import BuilderLayout from '../../components/BuilderLayout';

const Builder = () => {
  const [isSmallScene] = useMediaQuery('(max-width: 1280px)');

  return (
    <BuilderContextProvider>
      <BuilderContext.Consumer>
        {({
          initialValues,
          mergeTags,
          onChangeMergeTag,
          onBeforePreview,
          onSubmit,
        }) => (
          <EmailEditorProvider
            data={initialValues}
            height={'calc(100vh - 72px)'}
            autoComplete
            dashed={false}
            mergeTags={mergeTags}
            mergeTagGenerate={(tag) => `{{${tag}}}`}
            onChangeMergeTag={onChangeMergeTag}
            onBeforePreview={onBeforePreview}
            onSubmit={onSubmit}
          >
            {({ values }, { submit }) => {
              return (
                <BuilderLayout onSave={submit}>
                  {/* @ts-ignore */}
                  <StandardLayout compact={!isSmallScene} showSourceCode={true}>
                    <EmailEditor />
                  </StandardLayout>
                </BuilderLayout>
              );
            }}
          </EmailEditorProvider>
        )}
      </BuilderContext.Consumer>
    </BuilderContextProvider>
  );
};

export default Builder;
