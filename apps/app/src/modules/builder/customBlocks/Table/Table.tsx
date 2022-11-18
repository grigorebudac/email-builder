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
import { theme } from '@lego/klik-ui';
import { CustomBlocksType } from '../../types/block.types';
import { TableOptionsType } from '../../types/tableOptions.types';
import { getContentEditableClassName } from 'easy-email-editor';

const { Section, Column, Text, Image, Button, Wrapper, MjmlBlock } = components;

export type TableBlockData = IBlockData<
  {
    'background-color': string;
    'table-rows': string;
    'table-cols': string;
  },
  {
    title: string;
    text_align: string;
  }
>;

const Table = createCustomBlock<TableBlockData>({
  name: 'Table',
  type: CustomBlocksType.TABLE,
  validParentType: [
    BasicType.PAGE,
    AdvancedType.WRAPPER,
    BasicType.WRAPPER,
    AdvancedType.COLUMN,
    BasicType.COLUMN,
    AdvancedType.GROUP,
    BasicType.GROUP,
  ],
  create: (payload) => {
    const defaultData: TableBlockData = {
      type: CustomBlocksType.TABLE,
      data: {
        value: {
          title: 'LEGO cart',
          text_align: 'left',
        },
      },
      attributes: {
        'background-color': theme.colors.slate[50],
        'table-rows': '3',
        'table-cols': '3',
      },
      children: [],
    };

    return merge(payload, defaultData);
  },
  render: ({ data, idx, mode }) => {
    const { title, text_align } = data.data.value;
    const attributes = data.attributes;

    // const insetImage = options.includes(TableOptionsType.INSET_IMAGE);
    // const withImage = options.includes(TableOptionsType.WITH_IMAGE);
    // const withBorder = options.includes(TableOptionsType.WITH_BORDER);
    // const withButton = options.includes(TableOptionsType.WITH_BUTTON);

    return (
      <Wrapper
        // padding={`${attributes['padding-top']} ${attributes['padding-right']} ${attributes['padding-bottom']} ${attributes['padding-left']}`}
        css-class={
          mode === 'testing' ? getPreviewClassName(idx, data.type) : ''
        }
        padding="0px"
        border="none"
        direction="rtl"
      >
        <Section padding="0px" border-bottom="none">
          {Array.from({ length: Number(attributes['table-cols']) }, (_, i) => (
            <Column key={i}>
              <Section
                padding="5px 0px"
                background-color={attributes['background-color']}
                border-bottom={`2px solid ${theme.colors.slate[100]}`}
                css-class={getContentEditableClassName(
                  BasicType.TEXT,
                  `${idx}.data.value.header-${i}`
                ).join(' ')}
              >
                <Section padding="1px 10px">
                  <Text font-size="16px" align={text_align}>
                    To Converttt
                  </Text>
                </Section>
              </Section>

              {Array.from(
                { length: Number(attributes['table-rows']) },
                (_, j) => (
                  <Section
                    key={j}
                    padding="0px"
                    border-bottom={`1px solid ${theme.colors.slate[50]}`}
                    css-class={getContentEditableClassName(
                      BasicType.TEXT,
                      `${idx}.data.value.cell-${i}-${j}`
                    ).join(' ')}
                  >
                    <Section padding="4px 5px">
                      <Text align={text_align}>col1</Text>
                    </Section>
                  </Section>
                )
              )}
            </Column>
          ))}
        </Section>
      </Wrapper>
    );
  },
});

export default Table;
