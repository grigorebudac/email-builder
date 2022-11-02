import React, {
  useContext,
  createContext,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { AdvancedType, BasicType, BlockManager } from 'easy-email-core';
import { useRouter } from 'next/router';
import { Liquid } from 'liquidjs';
import { EmailEditorProviderProps, IEmailTemplate } from 'easy-email-editor';

import { Builder } from '../types/builder.types';
import {
  useLazyGetTemplateByIdQuery,
  useUpdateTemplateMutation,
} from '@/redux/endpoints/template.endpoints';
import { Template } from '@/types/template.types';
import { getMergeTagsFromString } from '../utils/getMergeTagsFromString';
import { merge } from 'lodash';
import { DEFAULT_MERGE_TAGS } from '../constants/defaultMergeTags';
import { CustomBlocksType } from '../types/block.types';
import { BlockAttributeConfigurationManager } from 'easy-email-extensions';
import Footer from '../customBlocks/Footer/Footer';
import FooterPanel from '../customBlocks/Footer/FooterPanel';
import ButtonPanel from '../customBlocks/Button/ButtonPanel';
import { theme } from '@lego/klik-ui';

interface BuilderContextValues {
  initialValues: Builder.InitialValues;
  mergeTags: Template.MergeTags;
  defaultMergeTags: Template.MergeTags;
  onBeforePreview: EmailEditorProviderProps['onBeforePreview'];
  onUpdateMergeTags: (values: IEmailTemplate) => void;
  onSubmit: (values: IEmailTemplate) => void;
  onSendTestEmail: (values: Template.MergeTags) => void;
}

BlockManager.registerBlocks({
  [CustomBlocksType.FOOTER]: Footer,
});

BlockAttributeConfigurationManager.add({
  [CustomBlocksType.FOOTER]: FooterPanel,
  [AdvancedType.BUTTON]: ButtonPanel,
});

export const BuilderContextProvider = (props: React.PropsWithChildren) => {
  const router = useRouter();
  const [getTemplateById, { data, isLoading }] = useLazyGetTemplateByIdQuery();

  const [mergeTags, setMergeTags] = useState<Template.MergeTags>({});
  const [updateTemplateMutation] = useUpdateTemplateMutation();

  const templateId = router.query?.templateId as string;

  useEffect(() => {
    if (router.isReady) {
      handlePageInit();
    }
  }, [router.query, router.isReady]);

  useEffect(() => {
    handleOverwriteColorPicker();
  }, []);

  const initialValues: IEmailTemplate = useMemo(() => {
    if (data == null) {
      return {
        subject: '',
        subTitle: '',
        content: BlockManager.getBlockByType(BasicType.PAGE).create({}),
      };
    }

    return {
      subject: '',
      subTitle: '',
      content: BlockManager.getBlockByType(BasicType.PAGE).create(data.content),
    };
  }, [data]);

  const defaultMergeTags = useMemo(() => {
    const value = merge(DEFAULT_MERGE_TAGS, mergeTags);
    return { ...value };
  }, [mergeTags]);

  function handleOverwriteColorPicker() {
    const defaultColors = [theme.colors.black, theme.colors.white];

    const colors = Object.values(theme.colors).reduce<string[]>((acc, cv) => {
      if (cv[400] != null) {
        acc.push(cv[400]);
      }

      return acc;
    }, defaultColors);

    localStorage.setItem('CURRENT_COLORS_KEY', JSON.stringify(colors));
  }

  async function handlePageInit() {
    try {
      await getTemplateById(templateId).unwrap();
    } catch {
      router.push('/');
    }
  }

  const handleBeforePreview: EmailEditorProviderProps['onBeforePreview'] =
    useCallback((html: string, mergeTags) => {
      const engine = new Liquid();
      const tpl = engine.parse(html);
      return engine.renderSync(tpl, mergeTags);
    }, []);

  async function handleSubmit(values: IEmailTemplate) {
    try {
      await updateTemplateMutation({
        id: templateId,
        content: values.content,
      }).unwrap();

      handleUpdateMergeTags(values);
    } catch (error) {
      console.log({ error });
    }
  }

  function handleUpdateMergeTags(values: IEmailTemplate) {
    const mergeTags = getMergeTagsFromString(JSON.stringify(values));
    setMergeTags(mergeTags);
  }

  function handleSendTestEmail(values: Template.MergeTags) {
    setMergeTags((prev) => merge({ ...prev }, values));
  }

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <BuilderContext.Provider
      value={{
        initialValues,
        mergeTags,
        defaultMergeTags,
        onBeforePreview: handleBeforePreview,
        onSubmit: handleSubmit,
        onSendTestEmail: handleSendTestEmail,
        onUpdateMergeTags: handleUpdateMergeTags,
      }}
    >
      {props.children}
    </BuilderContext.Provider>
  );
};

export const BuilderContext = createContext<BuilderContextValues>(
  {} as BuilderContextValues
);

export const useBuilderContext = () => useContext(BuilderContext);
