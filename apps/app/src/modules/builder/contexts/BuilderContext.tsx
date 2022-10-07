import React, { useContext, createContext, useCallback, useState } from 'react';
import { BasicType, BlockManager } from 'easy-email-core';

import { Builder } from '../types/builder.types';
import { EmailEditorProviderProps, IEmailTemplate } from 'easy-email-editor';
import { Liquid } from 'liquidjs';

interface BuilderContextValues {
  initialValues: Builder.InitialValues;
  mergeTags: Record<string, string>[];
  onBeforePreview: EmailEditorProviderProps['onBeforePreview'];
  onChangeMergeTag: (ptah: string, val: string) => void;
  onSubmit: (values: IEmailTemplate) => void;
}

const initialValues = {
  subject: '',
  subTitle: '',
  content: BlockManager.getBlockByType(BasicType.PAGE).create({
    data: {
      value: {
        breakpoint: '480px',
        headAttributes: '',
        'font-size': '14px',
        'font-weight': '400',
        'line-height': '1.7',
        headStyles: [],
        fonts: [],
        responsive: true,
        'font-family':
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif",
        'text-color': '#000000',
      },
    },
    attributes: {
      'background-color': '#efeeea',
      width: '600px',
    },
    children: [
      {
        type: 'wrapper',
        data: {
          value: {},
        },
        attributes: {
          padding: '20px 0px 20px 0px',
          border: 'none',
          direction: 'ltr',
          'text-align': 'center',
        },
        children: [
          {
            type: 'advanced_text',
            data: {
              value: {
                content: 'Hello World',
              },
            },
            attributes: {
              padding: '10px 25px 10px 25px',
              align: 'left',
            },
            children: [],
          },
        ],
      },
    ],
  }),
};

export const BuilderContextProvider = (props: React.PropsWithChildren) => {
  const [mergeTags, setMergeTags] = useState<Record<string, string>[]>([]);

  const handleBeforePreview: EmailEditorProviderProps['onBeforePreview'] =
    useCallback((html: string, mergeTags) => {
      const engine = new Liquid();
      const tpl = engine.parse(html);
      return engine.renderSync(tpl, mergeTags);
    }, []);

  function handleChangeMergeTag(ptah: string, val: string) {
    console.log('---> merge tag', { ptah, val });
  }

  function handleSubmit(values: IEmailTemplate) {
    console.log('---> submit', { values });
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
