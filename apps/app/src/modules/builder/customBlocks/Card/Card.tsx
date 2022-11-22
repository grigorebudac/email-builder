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
import { CardOptionsType, CardTargetType } from '../../types/cardOptions.types';
import { DEFAULT_IMAGE } from '@/constants/defaultImageSource';

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
    target: React.HTMLAttributeAnchorTarget;
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
          imageSrc: DEFAULT_IMAGE,
          buttonLabel: 'Action',
          href: '#',
          target: CardTargetType.SELF,
          options: [CardOptionsType.WITH_IMAGE, CardOptionsType.WITH_BORDER],
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

    const insetImage = options.includes(CardOptionsType.INSET_IMAGE);
    const withImage = options.includes(CardOptionsType.WITH_IMAGE);
    const withBorder = options.includes(CardOptionsType.WITH_BORDER);
    const withButton = options.includes(CardOptionsType.WITH_BUTTON);

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
              src={imageSrc || '/placeholder.png'}
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
