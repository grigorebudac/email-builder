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
import { useMediaQuery } from '@chakra-ui/media-query';
import { defaultCategories } from '../../customBlocks';

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
      })
    );

    setCategories(newCategories);
  }

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
                  <StandardLayout
                    compact={!isSmallScene}
                    showSourceCode={true}
                    categories={categories}
                  >
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
