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
  useUploadTemplateImageMutation,
} from '@/redux/endpoints/template.endpoints';
import { useSendEmailMutation } from '@/redux/endpoints/email.endpoints';
import { Template } from '@/types/template.types';
import { getMergeTagsFromString } from '../utils/getMergeTagsFromString';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import { DEFAULT_MERGE_TAGS } from '../constants/defaultMergeTags';
import { CustomBlocksType } from '../types/block.types';
import { BlockAttributeConfigurationManager } from 'easy-email-extensions';
import Footer from '../customBlocks/Footer/Footer';
import FooterPanel from '../customBlocks/Footer/FooterPanel';
import Card from '../customBlocks/Card/Card';
import CardPanel from '../customBlocks/Card/CardPanel';
import ButtonPanel from '../customBlocks/Button/ButtonPanel';
import mjml from 'mjml-browser';
import { JsonToMjml } from 'easy-email-core';
import { theme } from '@lego/klik-ui';
import { color } from '@lego/design-tokens-core';
import { Email } from '@/types/email.types';

interface BuilderContextValues {
  initialValues: Builder.InitialValues;
  mergeTags: Template.MergeTags;
  defaultMergeTags: Template.MergeTags;
  onBeforePreview: EmailEditorProviderProps['onBeforePreview'];
  onUpdateMergeTags: (values: IEmailTemplate) => void;
  onSubmit: (values: IEmailTemplate) => void;
  onPreviewEmail: (values: Template.MergeTags) => void;
  onSendTestEmail: (
    values: Template.MergeTags
  ) => Promise<Email.SendEmailResponse>;
  onUploadImage: (file: Blob) => Promise<string>;
}

BlockManager.registerBlocks({
  [CustomBlocksType.FOOTER]: Footer,
  [CustomBlocksType.CARD]: Card,
});

BlockAttributeConfigurationManager.add({
  [CustomBlocksType.FOOTER]: FooterPanel,
  [CustomBlocksType.CARD]: CardPanel,
  [AdvancedType.BUTTON]: ButtonPanel,
});

export const BuilderContextProvider = (props: React.PropsWithChildren) => {
  const router = useRouter();
  const [getTemplateById, { data, isLoading }] = useLazyGetTemplateByIdQuery();
  const [updateTemplateMutation] = useUpdateTemplateMutation();
  const [sendEmailMutation] = useSendEmailMutation();
  const [uploadTemplateImage] = useUploadTemplateImageMutation();
  const [mergeTags, setMergeTags] = useState<Template.MergeTags>({});

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

    const colors = Object.values(color.core).reduce<string[]>((acc, cv) => {
      if (cv[400] != null) {
        acc.push(cv[400]);
      }

      return acc;
    }, defaultColors);

    localStorage.setItem('CURRENT_COLORS_KEY', JSON.stringify(colors));
  }

  async function handlePageInit() {
    try {
      const template = await getTemplateById(templateId).unwrap();
      const mergeTags = getMergeTagsFromString(JSON.stringify(template));
      setMergeTags(mergeTags);
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
      const emailHtml = mjml(
        JsonToMjml({
          data: values.content,
          mode: 'production',
          context: values.content,
          dataSource: mergeTags,
        }),
        {
          validationLevel: 'soft',
        }
      ).html;

      await updateTemplateMutation({
        id: templateId,
        content: values.content,
        html: emailHtml,
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

  async function handlePreviewEmail(values: Template.MergeTags) {
    setMergeTags((prev) => merge({ ...prev }, values));
  }

  async function handleSendTestEmail(values: Template.MergeTags) {
    const mergeTagsWithoutFormData = omit(values, 'to', 'subject');
    setMergeTags((prev) => merge({ ...prev }, mergeTagsWithoutFormData));

    if (data == null) return;

    let emailHtml: string = mjml(
      JsonToMjml({
        data: data.content,
        mode: 'production',
        context: data.content,
        dataSource: mergeTags,
      }),
      {
        validationLevel: 'soft',
      }
    ).html;

    const engine = new Liquid();
    const tpl = engine.parse(emailHtml);
    emailHtml = engine.renderSync(tpl, mergeTagsWithoutFormData);

    const removeHtmlTagsRegExp = new RegExp(/<[^>]+>/g);
    const textFromHtml = emailHtml.replace(removeHtmlTagsRegExp, '');

    return sendEmailMutation({
      toAddress: values['to'].toString(),
      subject: values['subject'].toString(),
      body: {
        html: emailHtml,
        text: textFromHtml,
      },
    }).unwrap();
  }

  async function handleUploadImage(file: Blob) {
    try {
      const data = new FormData();
      data.append('file', file);

      const res = await uploadTemplateImage({ id: templateId, data }).unwrap();
      return res.location;
    } catch {
      return null;
    }
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
        onPreviewEmail: handlePreviewEmail,
        onSendTestEmail: handleSendTestEmail,
        onUpdateMergeTags: handleUpdateMergeTags,
        onUploadImage: handleUploadImage,
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
