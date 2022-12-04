import {
  IBlockData,
  BasicType,
  createCustomBlock,
  components,
  getPreviewClassName,
  AdvancedType,
} from 'easy-email-core';

import React from 'react';
import merge from 'lodash/merge';
import { CustomBlocksType } from '../../types/block.types';
import { LOGO_IMAGE_URL } from '@/constants/defaultImageSources';
import { BasicBlock } from '../../components/BasicBlock/BasicBlock';

const { Section, Column } = components;

export type LogoBlockData = IBlockData<
  {
    padding: string;
    align: string;
    width: string;
    height: string;
    src: string;
    'padding-top': string;
    'padding-bottom': string;
    'padding-left': string;
    'padding-right': string;
  },
  {}
>;

const Logo = createCustomBlock<LogoBlockData>({
  name: 'Logo',
  type: CustomBlocksType.LOGO,
  create: (payload) => {
    const defaultData: LogoBlockData = {
      type: CustomBlocksType.LOGO,
      data: {
        value: {},
      },
      attributes: {
        align: 'left',
        width: '80px',
        height: 'auto',
        padding: '0px 0px 0px 0px',
        'padding-top': '0px',
        'padding-bottom': '0px',
        'padding-left': '0px',
        'padding-right': '0px',
        src: LOGO_IMAGE_URL,
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [
    BasicType.PAGE,
    AdvancedType.WRAPPER,
    BasicType.WRAPPER,
    AdvancedType.COLUMN,
    BasicType.COLUMN,
    AdvancedType.GROUP,
    BasicType.GROUP,
    AdvancedType.HERO,
  ],
  render(params) {
    const attributes = params.data.attributes;

    return (
      <Section
        padding={`${attributes['padding-top']} ${attributes['padding-right']} ${attributes['padding-bottom']} ${attributes['padding-left']}`}
        css-class={
          params.mode === 'testing'
            ? getPreviewClassName(params.idx, params.data.type)
            : ''
        }
      >
        <Column>
          <BasicBlock params={params} tag="mj-image" />;
        </Column>
      </Section>
    );
  },
});

export default Logo;
