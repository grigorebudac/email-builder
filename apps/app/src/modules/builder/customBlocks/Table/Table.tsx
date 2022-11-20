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
import {
  TableBorderType,
  TableOptionsType,
} from '../../types/tableOptions.types';
import { getContentEditableClassName } from 'easy-email-editor';

const { Section, Column, Text, Wrapper } = components;

export type TableBlockData = IBlockData<
  {
    'background-color': string;
    'table-rows': string;
    'table-cols': string;
    'header-background-color': string;
    'header-font-color': string;
    'body-font-color': string;
    'body-background-color': string;
    'border-color': string;
    'inside-border-width': string;
    'outside-border-width': string;
    'header-border-width': string;
  },
  {
    title: string;
    bodyTextAlign: string;
    headerTextAlign: string;
    options: string[];
    borderStyle: string;
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
          bodyTextAlign: 'left',
          headerTextAlign: 'left',
          options: [TableOptionsType.WITH_HEADER],
          borderStyle: TableBorderType.SOLID,
        },
      },
      attributes: {
        'background-color': theme.colors.slate[50],
        'table-rows': '3',
        'table-cols': '3',
        'header-background-color': theme.colors.slate[50],
        'header-font-color': theme.colors.black,
        'body-font-color': theme.colors.black,
        'body-background-color': theme.colors.white,
        'border-color': theme.colors.slate[100],
        'inside-border-width': '2px',
        'outside-border-width': '2px',
        'header-border-width': '3px',
      },
      children: [],
    };

    return merge(payload, defaultData);
  },
  render: ({ data, idx, mode }) => {
    const { headerTextAlign, bodyTextAlign, options, borderStyle } =
      data.data.value;
    const attributes = data.attributes;

    const hasHeader = options.includes(TableOptionsType.WITH_HEADER);
    const hasInsideBorder = options.includes(
      TableOptionsType.WITH_INSIDE_BORDER
    );
    const hasOutsideBorder = options.includes(
      TableOptionsType.WITH_OUTSIDE_BORDER
    );

    const tableOutsideBorder = hasOutsideBorder
      ? `${attributes['outside-border-width']} ${borderStyle} ${attributes['border-color']}`
      : 'none';
    const tableInsideBorder = hasInsideBorder
      ? `${attributes['inside-border-width']} ${borderStyle} ${attributes['border-color']}`
      : 'none';
    const tableHeaderBorder = hasInsideBorder
      ? `${attributes['header-border-width']} ${borderStyle} ${attributes['border-color']}`
      : 'none';

    return (
      <Wrapper
        css-class={
          mode === 'testing' ? getPreviewClassName(idx, data.type) : ''
        }
        padding="0px"
        border="none"
        direction="rtl"
      >
        <Section padding="0px" border-bottom="none" border={tableOutsideBorder}>
          {Array.from({ length: Number(attributes['table-cols']) }, (_, i) => (
            <Column key={i}>
              {hasHeader && (
                <Section
                  padding="0px"
                  background-color={attributes['header-background-color']}
                  border-bottom={tableHeaderBorder}
                  css-class={getContentEditableClassName(
                    BasicType.TEXT,
                    `${idx}.data.value.header-${i}`
                  ).join(' ')}
                >
                  <Section padding="1px 10px">
                    <Text
                      font-size="16px"
                      font-weight="bold"
                      align={headerTextAlign}
                      color={attributes['header-font-color']}
                    >
                      To Convert
                    </Text>
                  </Section>
                </Section>
              )}

              {Array.from(
                { length: Number(attributes['table-rows']) },
                (_, j) => (
                  <Section
                    key={j}
                    padding="0px"
                    background-color={attributes['body-background-color']}
                    border-bottom={
                      j != Number(attributes['table-rows']) - 1 &&
                      hasInsideBorder
                        ? tableInsideBorder
                        : 'none'
                    }
                    css-class={getContentEditableClassName(
                      BasicType.TEXT,
                      `${idx}.data.value.cell-${i}-${j}`
                    ).join(' ')}
                  >
                    <Section padding="1px 10px">
                      <Text
                        align={bodyTextAlign}
                        color={attributes['body-font-color']}
                      >
                        col
                      </Text>
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
