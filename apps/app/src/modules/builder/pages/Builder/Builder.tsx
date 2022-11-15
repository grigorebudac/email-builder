import React, { useEffect, useState } from 'react';
import { EmailEditor, EmailEditorProvider } from 'easy-email-editor';
import {
  BlockMarketCategory,
  BlockMarketManager,
  ExtensionProps,
  StandardLayout,
} from 'easy-email-extensions';
import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';
import '@arco-themes/react-easy-email-theme/css/arco.css';

import {
  BuilderContextProvider,
  BuilderContext,
} from '../../contexts/BuilderContext';
import BuilderLayout from '../../components/BuilderLayout';
import { defaultCategories } from '../../customBlocks';
import { useMediaQuery } from '@chakra-ui/media-query';
import Autosave from '../../components/Autosave';

const Builder = () => {
  const [isSmallScene] = useMediaQuery('(max-width: 1280px)');
  const [categories, setCategories] = useState<ExtensionProps['categories']>(
    []
  );

  useEffect(() => {
    handleSetCategories(defaultCategories);

    BlockMarketManager.subscribe(handleSetCategories);
    return () => {
      BlockMarketManager.subscribe(handleSetCategories);
    };
  }, []);

  function handleSetCategories(categories: BlockMarketCategory[]) {
    const newCategories: ExtensionProps['categories'] = categories.map(
      (category) => ({
        label: category.name,
        blocks: category.blocks,
        active: true,
      })
    );

    setCategories(newCategories);
  }

  return (
    <BuilderContextProvider>
      <BuilderContext.Consumer>
        {({
          initialValues,
          mergeTags,
          defaultMergeTags,
          onBeforePreview,
          onSubmit,
          onPreviewEmail,
          onSendTestEmail,
        }) => (
          <EmailEditorProvider
            data={initialValues}
            height={'calc(100vh - 72px)'}
            autoComplete
            dashed={false}
            mergeTags={defaultMergeTags}
            mergeTagGenerate={(tag) => `{{${tag}}}`}
            onBeforePreview={onBeforePreview}
            onSubmit={onSubmit}
          >
            {({ values }, { submit }) => {
              return (
                <BuilderLayout
                  mergeTags={mergeTags}
                  onSave={submit}
                  onPreviewEmail={onPreviewEmail}
                  onSendTestEmail={onSendTestEmail}
                >
                  <Autosave values={values} onSave={submit} />
                  {/* @ts-ignore */}
                  <StandardLayout
                    compact={!isSmallScene}
                    showSourceCode={true}
                    categories={categories}
                  >
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
