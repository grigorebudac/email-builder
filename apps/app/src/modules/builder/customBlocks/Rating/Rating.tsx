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
import { CustomBlocksType } from '../../types/block.types';
import { Star } from './Star';
import { color } from '@lego/design-tokens-core';

const { Group, Wrapper } = components;

export type RatingBlockData = IBlockData<
  {
    'star-color': string;
    'padding-top': string;
    'padding-bottom': string;
    'padding-left': string;
    'padding-right': string;
    gap: string;
  },
  {
    stars: string;
  }
>;

const Rating = createCustomBlock<RatingBlockData>({
  name: 'Rating',
  type: CustomBlocksType.RATING,
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
    const defaultData: RatingBlockData = {
      type: CustomBlocksType.RATING,
      data: {
        value: {
          stars: '5',
        },
      },
      attributes: {
        'star-color': color.brand.flameYellow,
        'padding-top': '5px',
        'padding-bottom': '5px',
        'padding-left': '10px',
        'padding-right': '10px',
        gap: '3px',
      },
      children: [],
    };

    return merge(payload, defaultData);
  },
  render: ({ data, idx, mode }) => {
    let { stars } = data.data.value;
    const attributes = data.attributes;
    const padding = `${attributes['padding-top']} ${attributes['padding-right']} ${attributes['padding-bottom']} ${attributes['padding-left']}`;

    return (
      <Wrapper
        css-class={
          mode === 'testing' ? getPreviewClassName(idx, data.type) : ''
        }
        padding={padding}
      >
        <Group>
          {[...Array(5)].map((_, i) => (
            <Star
              color={attributes['star-color']}
              gap={attributes.gap}
              filled={i < Number(stars)}
            />
          ))}
        </Group>
      </Wrapper>
    );
  },
});

export default Rating;
