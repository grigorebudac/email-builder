import React, { useEffect, useState } from 'react';
import { EmailEditor, EmailEditorProvider } from 'easy-email-editor';
import {
  BlockAttributeConfigurationManager,
  BlockMarketCategory,
  BlockMarketManager,
  ExtensionProps,
  StandardLayout,
} from 'easy-email-extensions';
import { useMediaQuery } from '@chakra-ui/media-query';
import BuilderLayout from '../../components/BuilderLayout';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';
import '@arco-themes/react-easy-email-theme/css/arco.css';

import {
  BuilderContextProvider,
  BuilderContext,
} from '../../contexts/BuilderContext';
import { defaultCategories } from '../../customBlocks';
import { AdvancedType } from 'easy-email-core';
import { Panel as ButtonPanel } from '../../customBlocks/Pages/Button';

BlockAttributeConfigurationManager.add({
  [AdvancedType.BUTTON]: ButtonPanel,
});

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
                  onSendTestEmail={onSendTestEmail}
                >
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
