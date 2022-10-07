import React, {
  useContext,
  createContext,
  useCallback,
  useState,
  useMemo,
} from 'react';
import { BasicType, BlockManager } from 'easy-email-core';

import { Builder } from '../types/builder.types';
import { EmailEditorProviderProps, IEmailTemplate } from 'easy-email-editor';
import { Liquid } from 'liquidjs';
import {
  useGetTemplateByIdQuery,
  useUpdateTemplateMutation,
} from '../redux/endpoints/builder.endpoints';

interface BuilderContextValues {
  initialValues: Builder.InitialValues;
  mergeTags: Record<string, string>[];
  onBeforePreview: EmailEditorProviderProps['onBeforePreview'];
  onChangeMergeTag: (ptah: string, val: string) => void;
  onSubmit: (values: IEmailTemplate) => void;
}

export const BuilderContextProvider = (props: React.PropsWithChildren) => {
  const { data, isLoading } = useGetTemplateByIdQuery(
    '63403be4beb6f474f4f48037'
  );
  const [mergeTags, setMergeTags] = useState<Record<string, string>[]>([]);
  const [updateTemplateMutation] = useUpdateTemplateMutation();

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
        id: '63403be4beb6f474f4f48037',
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
