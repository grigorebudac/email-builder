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
    'padding-top': string;
    'padding-bottom': string;
    'padding-left': string;
    'padding-right': string;
    'last-row-padding': string;
    'inner-cell-padding-h': string;
    'inner-cell-padding-v': string;
    'header-font-size': string;
    'cell-font-size': string;
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
        'header-font-size': '16px',
        'cell-font-size': '14px',
        'header-background-color': theme.colors.slate[50],
        'header-font-color': theme.colors.black,
        'body-font-color': theme.colors.black,
        'body-background-color': theme.colors.white,
        'border-color': theme.colors.slate[100],
        'inside-border-width': '2px',
        'outside-border-width': '2px',
        'header-border-width': '3px',
        'padding-top': '0px',
        'padding-bottom': '0px',
        'padding-left': '0px',
        'padding-right': '0px',
        'last-row-padding': '0px',
        'inner-cell-padding-h': '10px',
        'inner-cell-padding-v': '2px',
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

    const numberOfTableRows = Number(attributes['table-rows']);
    const numberOfTableCols = Number(attributes['table-cols']);

    return (
      <Wrapper
        css-class={
          mode === 'testing' ? getPreviewClassName(idx, data.type) : ''
        }
        padding={`${attributes['padding-top']} ${attributes['padding-right']} ${attributes['padding-bottom']} ${attributes['padding-left']}`}
        border="none"
        direction="rtl"
      >
        <Section padding="0px" border-bottom="none" border={tableOutsideBorder}>
          {[...Array(numberOfTableCols)].map((_, i) => (
            <Column key={i}>
              {hasHeader && (
                <Section
                  padding="0px"
                  background-color={attributes['header-background-color']}
                  border-bottom={tableHeaderBorder}
                >
                  <Section padding="5px 10px">
                    <Text
                      font-size={`${attributes['header-font-size']}`}
                      font-weight="bold"
                      align={headerTextAlign}
                      color={attributes['header-font-color']}
                      css-class={getContentEditableClassName(
                        BasicType.TEXT,
                        `${idx}.data.value.header-${i}`
                      ).join(' ')}
                    >
                      {data['data']['value'][`header-${i}`]
                        ? data['data']['value'][`header-${i}`]
                        : `header-${i}`}
                    </Text>
                  </Section>
                </Section>
              )}

              {[...Array(numberOfTableRows)].map((_, j) => (
                <Section
                  key={j}
                  padding={
                    j != numberOfTableRows - 1
                      ? '0px'
                      : `0px 0px ${attributes['last-row-padding']} 0px`
                  }
                  background-color={attributes['body-background-color']}
                  border-bottom={
                    j != numberOfTableRows - 1 ||
                    (hasInsideBorder && !hasOutsideBorder)
                      ? tableInsideBorder
                      : 'none'
                  }
                >
                  <Section
                    padding={`${attributes['inner-cell-padding-v']} ${attributes['inner-cell-padding-h']}`}
                  >
                    <Text
                      font-size={`${attributes['cell-font-size']}`}
                      align={bodyTextAlign}
                      color={attributes['body-font-color']}
                      font-weight="300"
                      css-class={getContentEditableClassName(
                        BasicType.TEXT,
                        `${idx}.data.value.cell-${i}-${j}`
                      ).join(' ')}
                    >
                      {data['data']['value'][`cell-${i}-${j}`]
                        ? data['data']['value'][`cell-${i}-${j}`]
                        : `cell-${i}-${j}`}
                    </Text>
                  </Section>
                </Section>
              ))}
            </Column>
          ))}
        </Section>
      </Wrapper>
    );
  },
});

export default Table;
