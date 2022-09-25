import React, { useContext, createContext } from 'react';
import { BasicType, BlockManager } from 'easy-email-core';

import { Builder } from '../types/builder.types';

interface BuilderContextValues {
  initialValues: Builder.InitialValues;
}

const initialValues = {
  subject: 'Welcome to Easy-email',
  subTitle: 'Nice to meet you!',
  content: BlockManager.getBlockByType(BasicType.PAGE).create({}),
};

export const BuilderContextProvider = (props: React.PropsWithChildren) => {
  return (
    <BuilderContext.Provider
      value={{
        initialValues,
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
