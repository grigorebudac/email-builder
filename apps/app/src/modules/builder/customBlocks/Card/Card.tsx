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

const { Section, Column, Text, Image, Button } = components;

export type CardBlockData = IBlockData<
  {
    'title-color': string;
    'description-color': string;
    'padding-top': string;
    'padding-bottom': string;
    'padding-left': string;
    'padding-right': string;
    'button-color': string;
    'button-label-color': string;
  },
  {
    title: string;
    description: string;
    imageSrc: string;
    buttonLabel: string;
    options: string[];
    href: string;
    target: '_blank' | '_self';
  }
>;

const Card = createCustomBlock<CardBlockData>({
  name: 'Card',
  type: CustomBlocksType.CARD,
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
    const defaultData: CardBlockData = {
      type: CustomBlocksType.CARD,
      data: {
        value: {
          title: 'Lorem ipsum',
          description:
            'With amazing detail, this awesome LEGO® Trolls World Tour Pop Village Celebration (41255) Trolls tree house building set opens a world of imaginative play for young Trolls fans.',
          imageSrc: '',
          buttonLabel: 'Action',
          href: '#',
          target: '_self',
          options: ['with_image', 'with_border'],
        },
      },
      attributes: {
        'title-color': theme.colors['black'],
        'description-color': theme.colors['black'],
        'padding-top': '0px',
        'padding-bottom': '0px',
        'padding-left': '0px',
        'padding-right': '0px',
        'button-color': theme.colors['light-blue'][400],
        'button-label-color': theme.colors['white'],
      },
      children: [],
    };

    return merge(payload, defaultData);
  },
  render: ({ data, idx, mode }) => {
    const { title, description, imageSrc, buttonLabel, href, target, options } =
      data.data.value;
    const attributes = data.attributes;

    const insetImage = options.includes('inset_image');
    const withImage = options.includes('with_image');
    const withBorder = options.includes('with_border');
    const withButton = options.includes('with_button');

    return (
      <Section
        padding={`${attributes['padding-top']} ${attributes['padding-right']} ${attributes['padding-bottom']} ${attributes['padding-left']}`}
        css-class={
          mode === 'testing' ? getPreviewClassName(idx, data.type) : ''
        }
      >
        <Column
          border={
            withBorder ? `1px solid ${theme.colors['slate'][200]}` : 'none'
          }
        >
          {withImage && (
            <Image
              padding={insetImage ? '15px' : '0px'}
              alt="card-image"
              src={
                imageSrc ||
                'data:image/png;base64,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'
              }
            />
          )}
          <Text
            font-size="18px"
            padding="15px 15px 0px 15px"
            line-height="1"
            align="left"
            color={attributes['title-color']}
          >
            {title}
          </Text>
          <Text
            font-size="14px"
            padding="5px 15px 15px 15px"
            align="left"
            color={attributes['description-color']}
          >
            {description}
          </Text>

          {withButton && (
            <Button
              align="left"
              padding="0px 15px 15px 15px"
              color={attributes['button-label-color']}
              background-color={attributes['button-color']}
              href={href}
              target={target}
            >
              {buttonLabel}
            </Button>
          )}
        </Column>
      </Section>
    );
  },
});

export default Card;
