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
  useTemplatePreviewImageMutation,
  useUploadTemplateImageMutation,
} from '@/redux/endpoints/template.endpoints';
import { useSendEmailMutation } from '@/redux/endpoints/email.endpoints';
import { Template } from '@/types/template.types';
import { getMergeTagsFromString } from '../utils/getMergeTagsFromString';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';
import { DEFAULT_MERGE_TAGS } from '../constants/defaultMergeTags';
import { CustomBlocksType } from '../types/block.types';
import { BlockAttributeConfigurationManager } from 'easy-email-extensions';
import Footer from '../customBlocks/Footer/Footer';
import FooterPanel from '../customBlocks/Footer/FooterPanel';
import Card from '../customBlocks/Card/Card';
import CardPanel from '../customBlocks/Card/CardPanel';
import Table from '../customBlocks/Table/Table';
import TablePanel from '../customBlocks/Table/TablePanel';
import ButtonPanel from '../customBlocks/Button/ButtonPanel';
import Logo from '../customBlocks/Logo/Logo';
import LogoPanel from '../customBlocks/Logo/LogoPanel';
import { theme } from '@lego/klik-ui';
import { color, fontFamily } from '@lego/design-tokens-core';
import { Email } from '@/types/email.types';
import { jsonToHtml } from '../utils/jsonToHtml';
import Rating from '../customBlocks/Rating/Rating';
import RatingPanel from '../customBlocks/Rating/RatingPanel';
import { SocialBanner } from '../customBlocks/Social/Social';
import { SocialBannerPanel } from '../customBlocks/Social/SocialPanel';

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
  [CustomBlocksType.LOGO]: Logo,
  [CustomBlocksType.TABLE]: Table,
  [CustomBlocksType.RATING]: Rating,
  [CustomBlocksType.SOCIALBANNER]: SocialBanner,
});

BlockAttributeConfigurationManager.add({
  [CustomBlocksType.FOOTER]: FooterPanel,
  [CustomBlocksType.CARD]: CardPanel,
  [CustomBlocksType.LOGO]: LogoPanel,
  [CustomBlocksType.TABLE]: TablePanel,
  [CustomBlocksType.RATING]: RatingPanel,
  [CustomBlocksType.SOCIALBANNER]: SocialBannerPanel,
  [AdvancedType.BUTTON]: ButtonPanel,
});

export const BuilderContextProvider = (props: React.PropsWithChildren) => {
  const router = useRouter();
  const [getTemplateById, { data, isLoading }] = useLazyGetTemplateByIdQuery();
  const [updateTemplateMutation] = useUpdateTemplateMutation();
  const [sendEmailMutation] = useSendEmailMutation();
  const [uploadTemplateImage] = useUploadTemplateImageMutation();
  const [mergeTags, setMergeTags] = useState<Template.MergeTags>({});
  const [templatePreviewImageMutation] = useTemplatePreviewImageMutation();

  const templateId = router.query?.templateId as string;

  useEffect(() => {
    if (router.isReady) {
      handlePageInit();
    }
  }, [router.query, router.isReady]);

  useEffect(() => {
    handleOverwriteColorPicker();
  }, []);

  useEffect(() => {
    return () => {
      templatePreviewImageMutation(templateId);
    };
  }, [templateId]);

  const initialValues: IEmailTemplate = useMemo(() => {
    if (isEmpty(data?.content)) {
      let content = BlockManager.getBlockByType(BasicType.PAGE).create({
        attributes: {
          'background-color': theme.colors.white,
        },
        data: {
          value: {
            'font-family': `${fontFamily.sans}, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif`,
            fonts: [
              {
                href: 'https://assets.lego.com/fonts/v3/cera-pro/CeraPro-Regular.woff2',
                name: fontFamily.sans,
              },
            ],
          },
        },
      });

      return {
        subject: '',
        subTitle: '',
        content: content,
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
    const defaultColors = [
      theme.colors.white,
      color.brand.white,
      theme.colors.slate[100],
      color.brand.black,
      color.brand.brightYellow,
      color.brand.brightOrange,
      color.brand.brightRed,
      color.brand.lightPink,
      color.brand.mediumLilac,
      color.brand.brightBlue,
      color.brand.darkAzur,
      color.brand.brightGreen,
    ];

    localStorage.setItem('CURRENT_COLORS_KEY', JSON.stringify(defaultColors));
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
      const emailHtml = jsonToHtml(values.content, mergeTags);

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

    let emailHtml = jsonToHtml(data.content, mergeTags);

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
