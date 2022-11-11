import {
  IBlockData,
  BasicType,
  components,
  createCustomBlock,
  getPreviewClassName,
  AdvancedType,
} from 'easy-email-core';

import React from 'react';
import { merge } from 'lodash';
import { getContentEditableClassName } from 'easy-email-editor';
import { CustomBlocksType } from '../../types/block.types';
import { theme } from '@lego/klik-ui';

const { Column, Section, Wrapper, Text } = components;

export type FooterBlockData = IBlockData<
  {
    'background-color': string;
    'title-color': string;
  },
  {
    title: string;
    description: string;
  }
>;

const Footer = createCustomBlock<FooterBlockData>({
  name: 'Footer',
  type: CustomBlocksType.FOOTER,
  validParentType: [BasicType.PAGE, AdvancedType.WRAPPER, BasicType.WRAPPER],
  create: (payload) => {
    const defaultData: FooterBlockData = {
      type: CustomBlocksType.FOOTER,
      data: {
        value: {
          title: 'Hello World',
          description: 'My description goes in here',
        },
      },
      attributes: {
        'background-color': theme.colors['dark-blue'][500],
        'title-color': theme.colors['white'],
      },
      children: [
        {
          type: BasicType.TEXT,
          children: [],
          data: {
            value: {
              content: 'custom block title',
            },
          },
          attributes: {},
        },
      ],
    };
    return merge(payload, defaultData);
  },
  render: ({ data, idx, mode, context, dataSource }) => {
    const { title, description } = data.data.value;
    const attributes = data.attributes;

    return (
      <Wrapper
        css-class={
          mode === 'testing' ? getPreviewClassName(idx, data.type) : ''
        }
        padding="20px 0px 20px 0px"
        border="none"
        direction="ltr"
        text-align="center"
        background-color={attributes['background-color']}
      >
        <Section padding="0px">
          <Column padding="0px" border="none" vertical-align="top">
            <Text
              font-size="20px"
              padding="10px 25px 10px 25px"
              line-height="1"
              align="center"
              font-weight="bold"
              color={attributes['title-color']}
              css-class={getContentEditableClassName(
                BasicType.TEXT,
                `${idx}.data.value.title`
              ).join(' ')}
            >
              {title}
            </Text>
          </Column>
        </Section>

        <Section padding="10px 0px 0px 0px">
          <Text
            font-size="15px"
            align="center"
            color={attributes['title-color']}
          >
            {description}
          </Text>
        </Section>
      </Wrapper>
    );
  },
});

export default Footer;
