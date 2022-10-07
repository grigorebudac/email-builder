import React, {
  useContext,
  createContext,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { BasicType, BlockManager } from 'easy-email-core';
import { useRouter } from 'next/router';
import { Liquid } from 'liquidjs';
import { EmailEditorProviderProps, IEmailTemplate } from 'easy-email-editor';

import { Builder } from '../types/builder.types';
import {
  useLazyGetTemplateByIdQuery,
  useUpdateTemplateMutation,
} from '@/redux/endpoints/template.endpoints';

interface BuilderContextValues {
  initialValues: Builder.InitialValues;
  mergeTags: Record<string, string>[];
  onBeforePreview: EmailEditorProviderProps['onBeforePreview'];
  onChangeMergeTag: (ptah: string, val: string) => void;
  onSubmit: (values: IEmailTemplate) => void;
}

export const BuilderContextProvider = (props: React.PropsWithChildren) => {
  const router = useRouter();
  const [getTemplateById, { data, isLoading }] = useLazyGetTemplateByIdQuery();

  const [mergeTags, setMergeTags] = useState<Record<string, string>[]>([]);
  const [updateTemplateMutation] = useUpdateTemplateMutation();

  const templateId = router.query?.templateId as string;

  useEffect(() => {
    if (router.isReady) {
      handlePageInit();
    }
  }, [router.query, router.isReady]);

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

  function handleChangeMergeTag(ptah: string, val: string) {
    console.log('---> merge tag', { ptah, val });
  }

  async function handleSubmit(values: IEmailTemplate) {
    try {
      await updateTemplateMutation({
        id: templateId,
        content: values.content,
      }).unwrap();
    } catch (error) {
      console.log({ error });
    }
  }

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

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <BuilderContext.Provider
      value={{
        initialValues,
        mergeTags,
        onBeforePreview: handleBeforePreview,
        onChangeMergeTag: handleChangeMergeTag,
        onSubmit: handleSubmit,
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
